import { commonResponseCodes, useApi } from '../common'
import { authActions } from '../../reducers/authReducer'
import { loadTaskLists } from '../data/loadTaskLists'

export const loginResponses = {
    ...{UNKNOWN_USER: commonResponseCodes.UNKNOWN_USER},
    INVALID_PASSWORD: {code: 401, message: 'Invalid password.' }
}

export const loginRoute = 'auth/login'

export const login = (name, password) => dispatch => {
    dispatch({type: authActions.BEGIN_LOGIN})

    return useApi(dispatch, {
        target:loginRoute,
        allowedStatusCodes: [ loginResponses.INVALID_PASSWORD.code, loginResponses.UNKNOWN_USER.code ],
        payload: { name, password }
    }, ({code, body}) => {
        switch(code){
        case loginResponses.INVALID_PASSWORD.code:
            dispatch({ type: authActions.LOGIN_FAILED, reason: loginResponses.INVALID_PASSWORD.message })
            break
        case loginResponses.UNKNOWN_USER.code:
            dispatch({ type: authActions.LOGIN_FAILED, reason: loginResponses.UNKNOWN_USER.message })
            break
        case commonResponseCodes.OK.code:
            dispatch({ type: authActions.LOGIN_SUCCEEDED, session: { id: body.sessionId, user: body.userName } })
            dispatch(loadTaskLists(body.sessionId))
            break
        default:
            break
        }
    },
    error => dispatch({ type: authActions.LOGIN_FAILED, reason: 'An unknown error occured: ' + error }), true)
}