import { dataActions } from '../../reducers/dataReducer'
import { commonResponseCodes, useApi } from '../common'

import { selectTaskList } from './selectTaskList'
import { loadTaskLists } from './loadTaskLists'

export const updateTaskListRoute = 'tasklists/update'

export const commitTaskListEdit = (sessionId, id, title) => dispatch => {
    return useApi(dispatch, {
        target: updateTaskListRoute,
        allowedStatusCodes: [ commonResponseCodes.OK.code ],
        payload: { sessionId, taskListId: id, title }  
    },
    () => 
        dispatch(loadTaskLists(sessionId)).then(() => {
            dispatch(selectTaskList(id))
            dispatch({ type: dataActions.TOGGLE_EDITING_SELECTED_TASKLIST, editingSelectedTaskList: false })
        }), 
    () => { },
    true)
}