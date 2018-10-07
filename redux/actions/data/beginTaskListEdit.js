import { dataActions } from '../../reducers/dataReducer'

export const beginTaskListEdit = () => dispatch => {
    dispatch({type: dataActions.TOGGLE_EDITING_SELECTED_TASKLIST, value: true})
}