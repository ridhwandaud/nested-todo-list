import { dataActions } from '../../reducers/dataReducer'

export const cancelTaskListEdit = () => dispatch => {
    dispatch({type: dataActions.TOGGLE_EDITING_SELECTED_TASKLIST, value: false})
}