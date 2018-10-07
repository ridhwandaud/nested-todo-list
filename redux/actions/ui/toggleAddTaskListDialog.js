import { taskListMenuActions } from '../../reducers/uiReducer'

export const toggleAddNewTaskListDialog = open => {
    return {type: taskListMenuActions.TOGGLE_ADD_NEW_TASKLIST_DIALOG, value: open }
}