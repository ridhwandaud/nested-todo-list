import configureMockStore from 'redux-mock-store'
import expect from 'expect'

import { taskListMenuActions } from '../../../../redux/reducers/uiReducer'
import { toggleContextMenu } from '../../../../redux/actions/ui/toggleContextMenu'

const mockStore = configureMockStore()

describe('toggleContextMenu dispatch', () => {
    it('dispatch successful', () => {
        const store = mockStore({})
        store.dispatch(toggleContextMenu('', false))

        expect(store.getActions()).toEqual([{
            type: taskListMenuActions.TOGGLE_CONTEXT_MENU,
            taskListId: '',
            open: false
        }])
    })
})