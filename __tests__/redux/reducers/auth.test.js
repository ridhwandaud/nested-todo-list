import { authReducer, authActions } from '../../../redux/reducers/authReducer'

import { testReducer } from './common'

describe('auth reducer', () => {
    it(authActions.BEGIN_LOGIN, () => {
        testReducer({
            type:authActions.BEGIN_LOGIN
        },
        authReducer, {
            login: { inProgress: true }
        })
    })

    it(authActions.LOGIN_SUCCEEDED, () => {
        testReducer({
            type:authActions.LOGIN_SUCCEEDED,
            session: { id: 'id', user: 'user' }
        },
        authReducer, {
            login: { 
                inProgress: false, 
                loggedIn: true 
            }, session: {
                id: 'id', 
                user: 'user'
            } 
        })
    })
})