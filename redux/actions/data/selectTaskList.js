import { dataActions } from '../../reducers/dataReducer'

export const selectTaskList = id => dispatch => {
    dispatch({type: dataActions.SELECT_TASK_LIST, id})
}