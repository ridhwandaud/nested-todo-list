import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import { apiCallExpectations } from './common'
import { commonResponseCodes } from '../../../../redux/actions/common'
import { dataActions } from '../../../../redux/reducers/dataReducer'

import { getTaskListsRoute, loadTaskLists } from '../../../../redux/actions/data/loadTaskLists'

const mockStore = configureMockStore([thunk])

const testData = [{
    id: '5d84c751-b7fa-11e8-8d88-fba6c887162f',
    title: 'Sample task list',
    tasks: [
        '5d84c752-b7fa-11e8-8d88-fba6c887162f'
    ]
}]

describe('loadTaskLists dispatch', () => {
    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())

    it('loadTaskLists', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: commonResponseCodes.OK.code,
                response: testData
            })
        })

        const store = mockStore({})

        const expectedActions = [ 
            ...apiCallExpectations({
                target: getTaskListsRoute,
                allowedStatusCodes: [],
                payload: { sessionId: '' }  
            },{
                body: testData,
                code: commonResponseCodes.OK.code,
                successful: true
            }
            ), {
                type: dataActions.SET_TASK_LISTS,
                data: testData
            }]


        return store.dispatch(loadTaskLists('')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})