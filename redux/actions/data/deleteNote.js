import { useApi, commonResponseCodes } from '../../actions/common'
import { selectTask } from './selectTask'

export const deleteNoteRoute = 'note/add'

export const editSelectedTask = (sessionId, noteId) => dispatch => {
    return useApi(dispatch,
        {
            target: deleteNoteRoute,
            allowedStatusCodes: [ commonResponseCodes.INVALID_TASK_ID.code ],
            payload: { sessionId, noteId }
        }, 
        () => dispatch(selectTask(sessionId, noteId)),
        () => {},
        true)
}