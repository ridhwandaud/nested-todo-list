import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'

import { dataActions } from '../../../../redux/reducers/dataReducer'
import { selectTaskList } from '../../../../redux/actions/data/selectTaskList'

const mockStore = configureMockStore([thunk])

describe('selectTaskList', () => {
    it('selectTaskList dispatch', () => {
        const id = 'id'

        const store = mockStore({})
        const expectedActions = [{type: dataActions.SELECT_TASK_LIST, id }]

        store.dispatch(selectTaskList(id))
        expect(store.getActions()).toEqual(expectedActions)
    })
})