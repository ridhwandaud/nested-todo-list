import { useApi, commonResponseCodes } from '../../actions/common'
import { dataActions } from '../../reducers/dataReducer'

export const updateTaskRoute = 'task/update'

export const editSelectedTask = (sessionId, taskId, payload) => dispatch => {
    dispatch({type: dataActions.EDIT_SELECTED_TASK, payload})

    return useApi(dispatch,
        {
            target: updateTaskRoute,
            allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
            payload: { ...payload, sessionId, taskId }
        }, 
        () => {},
        () => {},
        false)
}