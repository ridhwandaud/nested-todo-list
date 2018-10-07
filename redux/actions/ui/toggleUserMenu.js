import { commonUiActions } from '../../reducers/uiReducer'

export const toggleUserMenu = (open) => {
    return {type: commonUiActions.TOGGLE_USER_MENU, value: open }
}