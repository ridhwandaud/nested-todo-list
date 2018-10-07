import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'

import { dataActions } from '../../../../redux/reducers/dataReducer'
import { beginTaskListEdit } from '../../../../redux/actions/data/beginTaskListEdit'

const mockStore = configureMockStore([thunk])

describe('beginTaskListEdit', () => {
    it('beginTaskListEdit dispatch', () => {
        const store = mockStore({})
        const expectedActions = [{type: dataActions.TOGGLE_EDITING_SELECTED_TASKLIST, value: true }]
    
        store.dispatch(beginTaskListEdit())
        expect(store.getActions()).toEqual(expectedActions)
    })
})

