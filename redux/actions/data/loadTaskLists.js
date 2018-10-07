import { useApi } from '../../actions/common'
import { dataActions } from '../../reducers/dataReducer'

export const getTaskListsRoute = 'tasklists'

export const loadTaskLists = sessionId => dispatch => {
    return useApi(dispatch, {
        target: getTaskListsRoute,
        allowedStatusCodes: [],
        payload: { sessionId }  
    },
    ({body}) => dispatch({type: dataActions.SET_TASK_LISTS, data: body}), 
    () => { },
    true)
}