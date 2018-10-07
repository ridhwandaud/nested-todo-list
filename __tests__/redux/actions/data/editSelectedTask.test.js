import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import { subtleApiCallExpectations } from './common'
import { commonResponseCodes } from '../../../../redux/actions/common'
import { dataActions } from '../../../../redux/reducers/dataReducer'

import { updateTaskRoute, editSelectedTask } from '../../../../redux/actions/data/editSelectedTask'

const mockStore = configureMockStore([thunk])

const reqData = {
    sessionId: '0039d680-b813-11e8-b622-55d2068cdbb6',
    taskId: '062d0720-b80d-11e8-8c7e-b99c3ffb7557',
    title: 'My new task #5',
    description: 'The 5th test task - updated description'
}

describe('editSelectedTask dispatch', () => {
    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())

    it('editSelectedTask success', () => {
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
                type: dataActions.EDIT_SELECTED_TASK,
                payload: {
                    title: reqData.title,
                    description: reqData.description
                }
            }],
            ...subtleApiCallExpectations({
                target: updateTaskRoute,
                allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
                payload: reqData  
            },{
                body: commonResponseCodes.OK.message,
                code: commonResponseCodes.OK.code,
                successful: true
            }
            )]


        return store.dispatch(editSelectedTask(reqData.sessionId, reqData.taskId, {title: reqData.title, description: reqData.description})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})