import { loginFormActions } from '../../reducers/uiReducer'

export const updateUsername = value => {
    return { type: loginFormActions.UPDATE_USERNAME, value }
}

export const updatePassword = value => {
    return { type: loginFormActions.UPDATE_PASSWORD, value }
}