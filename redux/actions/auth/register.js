import { authActions } from '../../reducers/authReducer'
import { useApi, commonResponseCodes } from '../common'
import { login } from './login'

export const registerResponses = {
    USERNAME_IN_USE: {code: 401, message: 'Username already in use.'}
}

export const registerRoute = 'auth/register'

export const register = (name, password) => dispatch => {
    var registerFailed = function(reason){
        return { type: authActions.REGISTER_FAILED, reason: reason }
    }

    dispatch({type: authActions.BEGIN_REGISTER})

    return useApi(dispatch, {
        target: registerRoute,
        allowedStatusCodes: [ registerResponses.USERNAME_IN_USE.code ],
        payload: { name, password }
    }, 
    ({code}) => {
        switch(code){
        case commonResponseCodes.OK.code:
            dispatch({type: authActions.REGISTER_SUCCEEDED})
            dispatch(login(name, password))
            break
        case registerResponses.USERNAME_IN_USE.code:
            dispatch(registerFailed(registerResponses.USERNAME_IN_USE.message))
            break
        default:
            dispatch(registerFailed('An unknown error occured. Status code: ' + code))
        }
    },
    error => dispatch(registerFailed('An unknown error occured. Error: ' + error)), true)
}