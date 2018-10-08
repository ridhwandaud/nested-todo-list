import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import stateModel from '../../../../redux/stateModel'

import { authActions } from '../../../../redux/reducers/authReducer'
import { apiActions } from '../../../../redux/reducers/apiReducer'
import { commonUiActions } from '../../../../redux/reducers/uiReducer'

import { loginResponses, loginRoute, login } from '../../../../redux/actions/auth/login'


const mockStore = configureMockStore([thunk])

const identity = { user: 'user', password: 'pass' } 
    
const expectedLoginActions = id => [{
    type: authActions.BEGIN_LOGIN
},{ 
    type: apiActions.BEGIN_API_CALL, 
    settings: {
        target:loginRoute,
        allowedStatusCodes: [loginResponses.INVALID_PASSWORD.code, loginResponses.UNKNOWN_USER.code],
        payload: { name: id.user, password: id.password }  
    } 
}, { 
    type: commonUiActions.TOGGLE_LOADING_BAR, 
    on: true 
}]

const successfulLoginActions = (id, session) => [...expectedLoginActions(id), {
    type: apiActions.API_CALL_COMPLETE,
    result: {
        body: {
            sessionId: session,
            userName: id.user,
            lastActive: 1537177692313
        },
        code: 200,
        successful: true
    }
}, {
    type: commonUiActions.TOGGLE_LOADING_BAR, 
    on: false 
}, {
    type: authActions.LOGIN_SUCCEEDED,
    session: {
        id: session,
        user: id.user
    }
}]

describe('Login action creator', () => {

    const responses = {
        successful: {
            sessionId: 'ca931890-ba5e-11e8-a67b-87bac10211ed',
            userName: 'user',
            lastActive: 1537177692313
        }
    }

    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())
    
    it('Successful login scenario - actions dispatched correctly', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: responses.successful
            })
        })

        const expectedActions = successfulLoginActions(identity, responses.successful.sessionId)

        const store = mockStore({auth: stateModel.auth})

        return store.dispatch(login(identity.user, identity.password)).then(() => {
            expect(store.getActions().slice(0, expectedActions.length)).toEqual(expectedActions)
        })
    })

    const testLoginFailure = reason => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: reason.code,
                response: reason.message
            })
        })

        const expectedActions = [ ...expectedLoginActions(identity), {
            type: apiActions.API_CALL_COMPLETE,
            result: {
                body: reason.message,
                code: reason.code,
                successful: true
            }
        }, {
            type: commonUiActions.TOGGLE_LOADING_BAR, 
            on: false
        }, {
            type: authActions.LOGIN_FAILED,
            reason: reason.message
        }]

        const store = mockStore({auth: stateModel.auth})

        return store.dispatch(login(identity.user, identity.password)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    }

    it('Failed login scenario - unknown user - actions dispatched correctly', () => testLoginFailure(loginResponses.INVALID_PASSWORD) )
    it('Failed login scenario - unknown user - actions dispatched correctly', () => testLoginFailure(loginResponses.UNKNOWN_USER) )
})