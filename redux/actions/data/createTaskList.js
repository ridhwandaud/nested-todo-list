import { useApi } from '../../actions/common'
import { loadTaskLists } from './loadTaskLists'
import { selectTaskList } from './selectTaskList'

export const newTaskListRoute = 'tasklists/new'

export const createTaskList = (sessionId, title) => dispatch => {
    return useApi(dispatch, {
        target: newTaskListRoute,
        allowedStatusCodes: [],
        payload: { sessionId, title }  
    },
    ({body}) => {
        const generatedId = body.id
        dispatch(loadTaskLists(sessionId)).then(() => {
            dispatch(selectTaskList(generatedId))
        })
    }, 
    () => { },
    true)
}