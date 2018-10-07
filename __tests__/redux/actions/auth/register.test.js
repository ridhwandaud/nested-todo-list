import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import stateModel from '../../../../redux/stateModel'
import { authActions } from '../../../../redux/reducers/authReducer'
import { apiActions } from '../../../../redux/reducers/apiReducer'
import { commonUiActions } from '../../../../redux/reducers/uiReducer'

import { register, registerRoute, registerResponses } from '../../../../redux/actions/auth/register'
import { commonResponseCodes } from '../../../../redux/actions/common'

const mockStore = configureMockStore([thunk])

const identity = { user: 'user1', password: 'pass' } 

const expectedRegisterActions = [{
    type: authActions.BEGIN_REGISTER
},{ 
    type: apiActions.BEGIN_API_CALL, 
    settings: {
        target: registerRoute,
        allowedStatusCodes: [registerResponses.USERNAME_IN_USE.code],
        payload: { name: identity.user, password: identity.password }  
    } 
}, {
    type: commonUiActions.TOGGLE_LOADING_BAR,
    on: true 
}]

describe('Register action creator', () => {
    beforeEach(() => moxios.install())
    afterEach(() => moxios.uninstall())
    
    it('Successful register scenario - actions dispatched correctly', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: commonResponseCodes.OK.code,
                response: commonResponseCodes.OK.message
            })
        })

        const expectedActions = [ ...expectedRegisterActions, {
            type: apiActions.API_CALL_COMPLETE,
            result: {
                body: commonResponseCodes.OK.message,
                code: commonResponseCodes.OK.code,
                successful: true
            }
        }, {
            type: commonUiActions.TOGGLE_LOADING_BAR, 
            on: false
        }, {
            type: authActions.REGISTER_SUCCEEDED
        }]

        const store = mockStore({auth: stateModel.auth})

        return store.dispatch(register(identity.user, identity.password)).then(() => {
            expect(store.getActions().slice(0, expectedActions.length) ).toEqual(expectedActions) //ignoring the login actions that follow
        })
    })

    it('Failed register scenario - username taken - actions dispatched correctly', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: registerResponses.USERNAME_IN_USE.code,
                response: registerResponses.USERNAME_IN_USE.message
            })
        })

        const expectedActions = [ ...expectedRegisterActions, {
            type: apiActions.API_CALL_COMPLETE,
            result: {
                body: registerResponses.USERNAME_IN_USE.message,
                code: registerResponses.USERNAME_IN_USE.code,
                successful: true
            }
        }, {
            type: commonUiActions.TOGGLE_LOADING_BAR, 
            on: false
        }, {
            type: authActions.REGISTER_FAILED,
            reason: registerResponses.USERNAME_IN_USE.message
        }]

        const store = mockStore({auth: stateModel.auth})

        return store.dispatch(register(identity.user, identity.password)).then(() => {
            expect(store.getActions().map(x=>x.type)).toEqual(expectedActions.map(x=>x.type))
        })
    })
})