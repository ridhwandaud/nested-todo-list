import stateModel from '../stateModel'

export const authActions = {
    BEGIN_LOGIN: 'BEGIN_LOGIN',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
    BEGIN_REGISTER: 'BEGIN_REGISTER',
    REGISTER_SUCCEEDED: 'REGISTER_SUCCEEDED',
    REGISTER_FAILED: 'REGISTER_FAILED',
    END_SESSION: 'END_SESSION'
}

export const authReducer = function(auth = stateModel.auth, action){
    switch(action.type){
    case authActions.BEGIN_LOGIN:
        return Object.assign({}, auth, {
            login: { 
                inProgress: true 
            } 
        })
    case authActions.LOGIN_FAILED:
        return Object.assign({}, auth, {
            login: { 
                inProgress: false, 
                badAttemptMade: true, 
                error: action.reason 
            } 
        })
    case authActions.LOGIN_SUCCEEDED:
        return Object.assign({}, auth, { 
            login: { 
                inProgress: false, 
                loggedIn: true }, 
            session: action.session
        })
    case authActions.BEGIN_REGISTER:
        return Object.assign({}, auth, {
            register: { 
                inProgress: true 
            }
        })
    case authActions.REGISTER_FAILED:
        return Object.assign({}, auth, {
            register: { 
                inProgress: false,
                badAttemptMade: true,
                error: action.reason
            } 
        })
    case authActions.REGISTER_SUCCEEDED:
        return Object.assign({}, auth, {
            register: { 
                inProgress: false
            }
        })
    case authActions.END_SESSION: 
        return Object.assign({}, auth, {
            login: { 
                inProgress: false, 
                loggedIn: false }, 
            session: { id: '', user: '' }
        })
    default:
        return auth
    }
}