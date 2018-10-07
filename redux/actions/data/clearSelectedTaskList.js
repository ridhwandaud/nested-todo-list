import { dataActions } from '../../reducers/dataReducer'

export const clearSelectedTaskList = () => dispatch => {
    dispatch({type: dataActions.CLEAR_SELECTED_TASK_LIST })
}