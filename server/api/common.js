const path = require('path')
const fs = require('fs')
const hash = require('password-hash')
const uuidv1 = require('uuid/v1')

const cachePath = path.resolve('cache.json')
const initialUserId = uuidv1()

const blankCache = {
    users: [{
        userId: initialUserId,
        userName: 'user',
        passwordHash: hash.generate('pass')}],
    sessions: [{
        sessionId: uuidv1(),
        userId: initialUserId,
        lastActive: (new Date(1970, 1, 1)).getTime()
    }],
    taskLists: [{
        id: uuidv1(),
        title: 'Sample task list',
        userId: initialUserId,
        tasks: [{
            id: uuidv1(),
            title: 'Sample task',
            description: 'Sample task description',
            completed: false,
            notes: [{
                id: uuidv1(),
                contents: 'Sample note'
            }]
        }]
    }]
}

const sendResponse = (response, object) => {
    response.status(200).send(object)
}

const loadCache = () => {
    if (!fs.existsSync(cachePath)){
        fs.writeFileSync(cachePath, JSON.stringify(blankCache, null, '    '))
    }

    return JSON.parse(fs.readFileSync(cachePath))
}

const writeCache = value => {
    if (!fs.existsSync(cachePath)){
        fs.rmdir(cachePath)
    }

    fs.writeFileSync(cachePath, JSON.stringify(value, null, '    '))
}

const find = (collection, predicate, fail, success) => {
    var search = collection.find(predicate)
    if (search){
        return success(search)
    } else {
        return fail()
    }
}

const modifyCache = applyChanges => {
    const oldCache = loadCache()
    const result = applyChanges(oldCache)

    if (result.newCache == null){
        return result
    } else {
        writeCache(result.newCache)
        return result
    }
    
}

module.exports = {
    onError: (error, res, callback) =>  {
        if (error){
            res.status(500).send(error)
        } else {
            callback()
        }
    },
    validateSession: (id, res, callback) => {
        var cache = loadCache()
        find(cache.sessions, session => session.sessionId === id,
            () => res.status(401).send('Invalid session'),
            session => {
                var now = (new Date).getTime()
                var millisecondsInactive = now - session.lastActive

                if (millisecondsInactive > 20 * 60 * 1000){                    
                    modifyCache(oldCache => ( {newCache: Object.assign({}, oldCache, {
                        sessions: oldCache.sessions.filter(s => s.sessionId !== session.sessionId) 
                    })} ) )
                    res.status(401).send('Session expired.')
                } else {
                    //update lastActive time
                    modifyCache(oldCache => ( { newCache: Object.assign({}, oldCache, {
                        sessions: oldCache.sessions.map(
                            s => s.sessionId === session.sessionId ? Object.assign({}, s, {lastActive: now}) : s) 
                    })} ) )

                    callback(session.userId)
                }
            })
    },
    modifyCache, 
    find,
    loadCache,
    sendResponse
}