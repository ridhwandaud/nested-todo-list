import axios from 'axios'
import { logout } from './auth/logout'

import { apiActions } from '../reducers/apiReducer'
import { commonUiActions } from '../reducers/uiReducer'

export const commonResponseCodes = {
    OK: { code: 200, message: 'OK' },
    SESSION_EXPIRED: { code: 403, message: 'Session expired.' },
    UNKNOWN_USER: { code: 400, message: 'Unknown user.'},
    INVALID_TASK_ID: { code: 404, message: 'Bad task ID provided.' }
}

const rootUrl = 'http://localhost:3000/api/'

export const useApi = function(dispatch, settings, callback, onError, withLoadingBar=false){
    const { target, allowedStatusCodes, payload } = settings

    dispatch({type: apiActions.BEGIN_API_CALL, settings })

    if (withLoadingBar){
        dispatch({type: commonUiActions.TOGGLE_LOADING_BAR, on: true})
    }

    return axios.post(
        rootUrl + target, 
        payload,
        {validateStatus: (status) => [...allowedStatusCodes, 200].some(code => code === status) })
        .then(response => {
            dispatch({type: apiActions.API_CALL_COMPLETE, result: {
                successful: true,
                code: response.status,
                body: response.data
            }})

            if (withLoadingBar){
                dispatch({type: commonUiActions.TOGGLE_LOADING_BAR, on: false})
            }

            return callback({code: response.status, body: response.data})
        }).catch(e => handleExpiredSession(dispatch, e, error => {
            const message = 
                error.response ? 'Request failed with status [' + error.response.status + ']. Details: ' + JSON.stringify(error.response) :
                    error.request ? 'Server could not be reached. Details: ' + JSON.stringify(error) : 
                        'Request setup failed. Error: ' + JSON.stringify(error)

            dispatch({type: apiActions.API_CALL_FAILED, result: {
                successful: false,
                message
            }})

            if (withLoadingBar){
                dispatch({type: commonUiActions.TOGGLE_LOADING_BAR, on: false})
            }

            return onError(error)
        }))
}

export const handleExpiredSession = (dispatch, error, callback) => {
    if (typeof(error.response) != 'undefined'){
        if (typeof(error.response.status) != 'undefined' ){
            if (error.response.status === commonResponseCodes.SESSION_EXPIRED.code){
                dispatch({type: logout()})
            } else return callback(error)
        } else return callback(error)
    } else {
        return callback(error)
    }
}