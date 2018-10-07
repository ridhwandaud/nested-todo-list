import { useApi, commonResponseCodes } from '../../actions/common'
import { dataActions } from '../../reducers/dataReducer'

export const deleteTaskRoute = 'task/delete' 

export const deleteSelectedTask = (sessionId, taskId) => dispatch => {
    dispatch({type: dataActions.DELETE_SELECTED_TASK})

    return useApi(dispatch,
        {
            target: deleteTaskRoute,
            allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
            payload: { sessionId, taskId }
        }, 
        () => {},
        () => {},
        true)
}