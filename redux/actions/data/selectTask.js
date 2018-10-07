import { useApi, commonResponseCodes } from '../../actions/common'
import { dataActions } from '../../reducers/dataReducer'

export const getTaskRoute = 'task'

export const selectTask = (sessionId, taskId) => dispatch => {
    return useApi(dispatch,
        {
            target: getTaskRoute,
            allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
            payload: { sessionId, taskId }
        }, 
        ({body}) => {
            dispatch({type: dataActions.SET_SELECTED_TASK, payload: body})
        },
        () => {},
        false)
}