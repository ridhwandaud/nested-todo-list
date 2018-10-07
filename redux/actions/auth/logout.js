import { authActions } from '../../reducers/authReducer'

export const logout = () => dispatch => {
    dispatch({ type: authActions.END_SESSION })
    dispatch({ type: 'RESET_APP' })
}