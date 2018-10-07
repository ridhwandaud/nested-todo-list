const uuidv1 = require('uuid/v1')

const { modifyCache, loadCache, find, validateSession } = require('./common')

const process = (req, res, cacheModifier, responseBuilder) => {
    validateSession(req.body.sessionId, res, userId => {
        const status = modifyCache(oldCache => cacheModifier(userId, oldCache))
        const {code, body} = responseBuilder(status)

        res.status(code).send(body)
    })
}

const processWithItem = (req, res, selector, predicate, notFoundMessage, cacheModifier, responseBuilder) => {
    var oldCache = loadCache()

    const {itemFound, item} = find(selector(oldCache), predicate,
        () => ( { itemFound: false} ),
        item => ( { itemFound: true, item} ))

    if (!itemFound){
        res.status(401).send(notFoundMessage)
    } else {
        process(req, res, (userId, cache) => cacheModifier(userId, cache, item), responseBuilder)
    }
}

function processWithTask(req, res, id, cacheModifier, responseBuilder){
    processWithItem(req, res, 
        cache => cache.taskLists.reduce((acc, next) => acc.concat(next.tasks), []), 
        task => task.id === id, 
        'Invalid task ID provided', 
        cacheModifier, 
        responseBuilder)
}

function processWithTaskList(req, res, id, cacheModifier, responseBuilder){
    processWithItem(req, res, 
        cache => cache.taskLists, 
        taskList => taskList.id === id, 
        'Invalid task list ID provided', 
        cacheModifier, 
        responseBuilder)
}

function processWithNote(req, res, id, cacheModifier, responseBuilder){
    processWithItem(req, res, 
        cache => cache.taskLists.reduce((acc, next) => acc.concat(next.tasks), []).reduce((acc, next) => acc.concat(next.notes), []), 
        note => note.id === id, 
        'Invalid note ID provided', 
        cacheModifier, 
        responseBuilder)
}

module.exports = {
    getAllTaskLists: async (req, res) => {
        process(req, res, (userId, cache) => ({
            data: cache.taskLists
                .filter(taskList => taskList.userId === userId)
                .map(taskList => ( {id: taskList.id, title: taskList.title, tasks: taskList.tasks.map(t => t.id)}))
        }), 
        result => ({code: 200, body: result.data}))
    },
    newTaskList: async (req, res) => {
        process(req, res, (userId, oldCache) => {
            const id = uuidv1()

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...oldCache.taskLists, {
                        id,
                        userId,
                        title: req.body.title,
                        tasks: []
                    }]
                }),
                id
            }
        }, 
        result => ({code: 200, body: {id: result.id}}))
    },
    deleteTaskList: async (req, res) => {
        process(req,res, (userId, oldCache) => ({
            newCache: Object.assign({}, oldCache, {
                taskLists: oldCache.taskLists.filter(taskList => taskList.id !== req.body.id)
            })
        }),
        () => ({code: 200, body: {}}))
    },
    updateTaskList: async (req, res) => {
        process(req,res, (userId, oldCache) => ({
            newCache: Object.assign({}, oldCache, {
                taskLists: oldCache.taskLists.map(taskList => {
                    if (taskList.id === req.body.taskListId){
                        return Object.assign({}, taskList, { title: req.body.title })
                    } else {
                        return taskList
                    }
                })
            })
        }),
        () => ({code: 200, body: {}}))
    },
    taskDetails: async (req, res) => {
        processWithTask(req, res, req.body.taskId, (userId, oldCache, task) => ({
            data: task
        }), 
        result => ({code: 200, body: result.data}))
    },
    newTask: async (req, res) => {
        processWithTaskList(req,res, req.body.taskListId, (userId, oldCache, taskList) => {
            const id = uuidv1()
            const newTask = {
                id,
                title: req.body.title,
                description: req.body.description,
                completed: false,
                notes: []
            }

            const reducedTaskLists = oldCache.taskLists.filter(tl => tl.id !== taskList.id)
            const newTaskList = Object.assign({}, taskList, { tasks: [...taskList.tasks, newTask] })

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...reducedTaskLists, newTaskList]
                }),
                id
            }
        },
        result => ({code: 200, body: {id: result.id}}))
    },
    updateTask: async (req, res) => {
        processWithTask(req, res, req.body.taskId, (userId, oldCache, task) => {
            const newTask = Object.assign({}, task, {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed
            })

            const parentTaskList = oldCache.taskLists.find(taskList => taskList.tasks.some(t => t.id === task.id))
            const reducedTasks = parentTaskList.tasks.filter(t => t.id !== task.id)
            const reducedTaskLists = oldCache.taskLists.filter(taskList => taskList.id !== parentTaskList.id)

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...reducedTaskLists, Object.assign({}, parentTaskList, { tasks: [...reducedTasks, newTask] })]
                })
            }
        }, 
        () => ({ code: 200, body: {} }))
    },
    deleteTask: async (req, res) => {
        processWithTask(req, res, req.body.taskId, (userId, oldCache, task) => {
            const parentTaskList = oldCache.taskLists.find(taskList => taskList.tasks.some(t => t.id === task.id))
            const reducedTasks = parentTaskList.tasks.filter(t => t.id !== task.id)
            const reducedTaskLists = oldCache.taskLists.filter(taskList => taskList.id !== parentTaskList.id)

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...reducedTaskLists, Object.assign({}, parentTaskList, { tasks: reducedTasks })]
                })
            }
        }, 
        () => ({ code: 200, body: {} }))
    },
    newNote: async (req, res) => {
        processWithTask(req, res, req.body.taskId, (userId, oldCache, task) => {
            const id = uuidv1()
            const newNote = {
                id: id,
                contents: req.body.contents
            }
            const newTask = Object.assign({}, task, {
                notes: task.notes.concat(newNote)
            })

            const parentTaskList = oldCache.taskLists.find(taskList => taskList.tasks.some(t => t.id === task.id))
            const reducedTasks = parentTaskList.tasks.filter(t => t.id !== task.id)
            const reducedTaskLists = oldCache.taskLists.filter(taskList => taskList.id !== parentTaskList.id)

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...reducedTaskLists, Object.assign({}, parentTaskList, { tasks: [...reducedTasks, newTask] })]
                })
            }
        }, 
        () => ({ code: 200, body: {} }))
    },
    updateNote: async (req, res) => {
        processWithNote(req, res, req.body.noteId, (userId, oldCache, note) => {
            const parentTaskList = oldCache.taskLists.find(taskList => taskList.tasks.some(t => t.notes.some(n => n.id === note.id)))
            const parentTask = parentTaskList.tasks.find(t=>t.notes.some(n => n.id === note.id))
            
            const reducedTasks = parentTaskList.tasks.filter(t => t.id !== parentTask.id)
            const reducedTaskLists = oldCache.taskLists.filter(taskList => taskList.id !== parentTaskList.id)

            const updatedNote = Object.assign({}, note, {
                contents: req.body.contents
            })

            const newTask = Object.assign({}, parentTask, {
                notes: [...parentTask.notes.filter(n => n.id !== note.id), updatedNote]
            })

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...reducedTaskLists, Object.assign({}, parentTaskList, { tasks: [...reducedTasks, newTask] })]
                })
            }
        },
        () => ({ code: 200, body: {} }))
    },
    deleteNote: async (req, res) => {
        processWithNote(req, res, req.body.noteId, (userId, oldCache, note) => {
            const parentTaskList = oldCache.taskLists.find(taskList => taskList.tasks.some(t => t.notes.some(n => n.id === note.id)))
            const parentTask = parentTaskList.tasks.find(t=>t.notes.some(n => n.id === note.id))
            
            const reducedTasks = parentTaskList.tasks.filter(t => t.id !== parentTask.id)
            const reducedTaskLists = oldCache.taskLists.filter(taskList => taskList.id !== parentTaskList.id)

            return {
                newCache: Object.assign({}, oldCache, {
                    taskLists: [...reducedTaskLists, Object.assign({}, parentTaskList, { tasks: reducedTasks })]
                })
            }
        },
        () => ({ code: 200, body: {} }))
    }
}