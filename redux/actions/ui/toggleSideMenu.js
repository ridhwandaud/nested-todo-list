import { taskListMenuActions } from '../../reducers/uiReducer'

export const toggleSideMenu = (open) => {
    return {type: taskListMenuActions.TOGGLE_SIDE_MENU, value: open }
}