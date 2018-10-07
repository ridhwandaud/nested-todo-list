import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import { apiCallExpectations } from './common'
import { commonResponseCodes } from '../../../../redux/actions/common'
import { dataActions } from '../../../../redux/reducers/dataReducer'

import { deleteTaskRoute, deleteSelectedTask } from '../../../../redux/actions/data/deleteSelectedTask'

const mockStore = configureMockStore([thunk])

const reqData = {
    sessionId: '',
    taskId: '062d0720-b80d-11e8-8c7e-b99c3ffb7557'
}

describe('deleteSelectedTask dispatch', () => {
    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())

    it('deleteSelectedTask success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: commonResponseCodes.OK.code,
                response: commonResponseCodes.OK.message
            })
        })

        const store = mockStore({})

        const expectedActions = [ 
            ...[{
                type: dataActions.DELETE_SELECTED_TASK
            }],
            ...apiCallExpectations({
                target: deleteTaskRoute,
                allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
                payload: reqData  
            },{
                body: commonResponseCodes.OK.message,
                code: commonResponseCodes.OK.code,
                successful: true
            }
            )]


        return store.dispatch(deleteSelectedTask(reqData.sessionId, reqData.taskId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})