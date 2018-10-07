import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'

import { dataActions } from '../../../../redux/reducers/dataReducer'
import { cancelTaskListEdit } from '../../../../redux/actions/data/cancelTaskListEdit'

const mockStore = configureMockStore([thunk])

describe('cancelTaskListEdit', () => {
    it('cancelTaskListEdit dispatch', () => {
        const store = mockStore({})
        const expectedActions = [{type: dataActions.TOGGLE_EDITING_SELECTED_TASKLIST, value: false }]

        store.dispatch(cancelTaskListEdit())
        expect(store.getActions()).toEqual(expectedActions)
    })
})

