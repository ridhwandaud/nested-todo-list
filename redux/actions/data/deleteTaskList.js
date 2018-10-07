import { dataActions } from '../../reducers/dataReducer'
import { useApi } from '../common'

import { clearSelectedTaskList } from './clearSelectedTaskList'
import { loadTaskLists } from './loadTaskLists'

export const deleteTaskListRoute = 'tasklists/delete'

export const deleteTaskList = (sessionId, id) => dispatch => {
    return useApi(dispatch, {
        target: deleteTaskListRoute,
        allowedStatusCodes: [ ],
        payload: { sessionId, id }  
    },
    () =>{
        dispatch(clearSelectedTaskList())
        dispatch(loadTaskLists(sessionId)).then(() => {
            dispatch({ type: dataActions.TOGGLE_EDITING_SELECTED_TASKLIST, editingSelectedTaskList: false })
        })
    }, 
    () => { },
    true)
}