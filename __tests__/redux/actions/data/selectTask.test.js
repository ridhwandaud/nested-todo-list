import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import { subtleApiCallExpectations } from './common'
import { commonResponseCodes } from '../../../../redux/actions/common'
import { dataActions } from '../../../../redux/reducers/dataReducer'

import { getTaskRoute, selectTask } from '../../../../redux/actions/data/selectTask'

const mockStore = configureMockStore([thunk])

const testData = {
    id: '5d84c752-b7fa-11e8-8d88-fba6c887162f',
    title: 'Sample task',
    description: 'Sample task description',
    notes: [
        {
            id: '5d84c753-b7fa-11e8-8d88-fba6c887162f',
            contents: 'Sample note - updated.'
        }
    ]
}

describe('selectTask dispatch', () => {
    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())

    it('selectTask success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: commonResponseCodes.OK.code,
                response: testData
            })
        })

        const store = mockStore({})

        const expectedActions = [ 
            ...subtleApiCallExpectations({
                target: getTaskRoute,
                allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
                payload: { sessionId: '1', taskId: testData.id }  
            },{
                body: testData,
                code: commonResponseCodes.OK.code,
                successful: true
            }
            ), {
                type: dataActions.SET_SELECTED_TASK,
                payload: testData
            }]


        return store.dispatch(selectTask('1', testData.id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})