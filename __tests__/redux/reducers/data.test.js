import { dataReducer, dataActions } from '../../../redux/reducers/dataReducer'
import stateModel from '../../../redux/stateModel'

import { testReducer } from './common'

const testData = [{
    id: '5d84c751-b7fa-11e8-8d88-fba6c887162f',
    title: 'Sample task list',
    tasks: [
        '5d84c752-b7fa-11e8-8d88-fba6c887162f'
    ]
}]

describe('data reducer', () => {
    it(dataActions.SET_TASK_LISTS, () => {
        testReducer({
            type: dataActions.SET_TASK_LISTS,
            data: testData
        }, dataReducer, {
            taskLists: testData
        })
    })

    it(dataActions.SELECT_TASK_LIST, () => {
        testReducer({
            type: dataActions.SELECT_TASK_LIST,
            id: testData[0].id
        }, dataReducer, {
            taskListSelected: true,
            selectedTaskList: testData[0].id
        })
    })

    it(dataActions.CLEAR_SELECTED_TASK_LIST, () => {
        testReducer({
            type: dataActions.CLEAR_SELECTED_TASK_LIST
        }, dataReducer, {
            taskListSelected: false,
            selectedTaskList: ''
        })
    })

    it(dataActions.SET_SELECTED_TASK, () => {
        testReducer({
            type: dataActions.SET_SELECTED_TASK,
            payload: {
                id: '1',
                title: 'title',
                description: 'desc',
                notes: [{
                    id: '1',
                    contents: 'contents'
                }]
            }
        }, dataReducer, {
            taskSelected: true,
            selectedTask: {
                apiData: {
                    id: '1',
                    title: 'title',
                    description: 'desc',
                    notes: [{
                        id: '1',
                        contents: 'contents'
                    }]
                },
                stagedEdit: {
                    title: 'title',
                    description: 'desc'
                }
            }
        })
    })

    it(dataActions.EDIT_SELECTED_TASK, () => {
        testReducer({
            type: dataActions.EDIT_SELECTED_TASK,
            payload: {
                title: 'updated title',
                description: 'updated description'
            }
        }, dataReducer, {
            selectedTask: {
                stagedEdit: {
                    title: 'updated title',
                    description: 'updated description'
                }
            }
        })
    })

    it('DELETE_SELECTED_TASK success', () => {
        const state = {
            ...stateModel.data,
            taskSelected: true,
            selectedTask: {
                apiData: {
                    id: '1',
                    title: 'title',
                    description: 'desc',
                    notes: [{
                        id: '1',
                        contents: 'contents'
                    }]
                },
                stagedEdit: {
                    title: 'title',
                    description: 'desc'
                }
            },
            deletedTasks: []
        }

        const action = {
            type: dataActions.DELETE_SELECTED_TASK
        }

        const result = dataReducer(state, action)
        expect(result).toEqual({
            ...stateModel.data,
            deletedTasks: ['1']
        })
    })
})