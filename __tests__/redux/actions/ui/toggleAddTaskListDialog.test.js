import configureMockStore from 'redux-mock-store'
import expect from 'expect'

import { taskListMenuActions } from '../../../../redux/reducers/uiReducer'
import { toggleAddNewTaskListDialog } from '../../../../redux/actions/ui/toggleAddTaskListDialog'

const mockStore = configureMockStore()

describe('toggleContextMenu dispatch', () => {
    it('dispatch successful', () => {
        const store = mockStore({})
        store.dispatch(toggleAddNewTaskListDialog(true))

        expect(store.getActions()).toEqual([{
            type: taskListMenuActions.TOGGLE_ADD_NEW_TASKLIST_DIALOG,
            value: true
        }])
    })
})