import stateModel from '../stateModel'

export const apiActions = {
    BEGIN_API_CALL: 'BEGIN_API_CALL',
    API_CALL_COMPLETE: 'API_CALL_COMPLETE',
    API_CALL_FAILED: 'API_CALL_FAILED'
}

export const apiReducer = function(api = stateModel.api, action) {
    switch (action.type){
    case apiActions.BEGIN_API_CALL:
        return {
            ...api,
            request: action.settings
        }
    case apiActions.API_CALL_COMPLETE:
    case apiActions.API_CALL_FAILED:
        return {
            ...api,
            response: action.result
        }
    default:
        return api
    }
}