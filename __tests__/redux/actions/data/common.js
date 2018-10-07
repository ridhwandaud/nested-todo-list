import { apiActions } from '../../../../redux/reducers/apiReducer'
import { commonUiActions } from '../../../../redux/reducers/uiReducer'

export const apiCallExpectations = (settings, response) => [{
    type: apiActions.BEGIN_API_CALL,
    settings
}, {
    type: commonUiActions.TOGGLE_LOADING_BAR, 
    on: true
}, {
    type: apiActions.API_CALL_COMPLETE,
    result: response
},{
    type: commonUiActions.TOGGLE_LOADING_BAR, 
    on: false 
}]

export const subtleApiCallExpectations = (settings, response) => [{
    type: apiActions.BEGIN_API_CALL,
    settings
}, {
    type: apiActions.API_CALL_COMPLETE,
    result: response
}]