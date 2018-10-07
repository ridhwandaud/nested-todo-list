import { useApi, commonResponseCodes } from '../../actions/common'
import { selectTask } from './selectTask'

export const addNoteRoute = 'note/add'

export const addNote = (sessionId, taskId, contents) => dispatch => {
    return useApi(dispatch,
        {
            target: addNoteRoute,
            allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
            payload: { sessionId, taskId, contents }
        }, 
        () => dispatch(selectTask(sessionId, taskId)),
        () => {},
        true)
}