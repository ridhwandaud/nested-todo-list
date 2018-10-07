import { taskListMenuActions } from '../../reducers/uiReducer'

export const toggleContextMenu = (taskListId, open) => {
    return {type: taskListMenuActions.TOGGLE_CONTEXT_MENU, taskListId, open }
}