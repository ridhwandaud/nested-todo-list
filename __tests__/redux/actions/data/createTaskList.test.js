import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import { apiCallExpectations } from './common'

import { newTaskListRoute, createTaskList } from '../../../../redux/actions/data/createTaskList'

const mockStore = configureMockStore([thunk])

const testData = [{
    id: '5d84c751-b7fa-11e8-8d88-fba6c887162f',
    title: 'Sample task list',
    tasks: [
        '5d84c752-b7fa-11e8-8d88-fba6c887162f'
    ]
}]

describe('createTaskList', () => {
    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())

    it('createTaskList dispatch', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: { id: testData.id }
            })
        })

        const store = mockStore({})

        const expectedActions = [ 
            ...apiCallExpectations({
                target: newTaskListRoute,
                allowedStatusCodes: [],
                payload: { sessionId: '' }  
            },{
                body: { id: testData.id },
                code: 200,
                successful: true
            }
            )]


        return store.dispatch(createTaskList('')).then(() => {
            expect(store.getActions().slice(0, expectedActions.length)).toEqual(expectedActions)
        })
    })
})