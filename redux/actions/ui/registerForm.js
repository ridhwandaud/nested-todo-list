import { registerFormActions } from '../../reducers/uiReducer'

export const updateUsername = value => {
    return { type: registerFormActions.UPDATE_USERNAME, value }
}

export const updatePassword = value => {
    return { type: registerFormActions.UPDATE_PASSWORD, value }
}

export const updateConfirmPassword = value => {
    return { type: registerFormActions.UPDATE_CONFIRM_PASSWORD, value }
}