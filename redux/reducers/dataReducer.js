import stateModel from '../stateModel'

export const dataActions = {
    SET_TASK_LISTS: 'SET_TASK_LISTS',
    SELECT_TASK_LIST: 'SELECT_TASK_LIST',
    CLEAR_SELECTED_TASK_LIST: 'CLEAR_SELECTED_TASK_LIST',
    TOGGLE_EDITING_SELECTED_TASKLIST: 'TOGGLE_EDITING_SELECTED_TASKLIST',
    SET_SELECTED_TASK: 'SET_SELECTED_TASK',
    EDIT_SELECTED_TASK: 'EDIT_SELECTED_TASK',
    DELETE_SELECTED_TASK: 'DELETE_SELECTED_TASK'
}

export const dataReducer = function(data=stateModel.data, action){
    switch(action.type){
    case dataActions.SET_TASK_LISTS:
        return { ...data, taskLists: action.data }
    case dataActions.SELECT_TASK_LIST:
        return { ...data, taskListSelected: true, selectedTaskList: action.id }
    case dataActions.CLEAR_SELECTED_TASK_LIST:
        return { ...data, taskListSelected: false, selectedTaskList: '' }
    case dataActions.SET_SELECTED_TASK:
        return { 
            ...data, 
            taskSelected: true,
            selectedTask: {
                apiData: action.payload,
                stagedEdit: {
                    title: action.payload.title,
                    description: action.payload.description
                }
            } 
        }
    case dataActions.EDIT_SELECTED_TASK:
        return {
            ...data,
            selectedTask: {
                ...data.selectedTask,
                stagedEdit: action.payload
            }
        }
    case dataActions.DELETE_SELECTED_TASK: 
        return {
            ...data,
            selectedTask: stateModel.data.selectedTask,
            taskSelected: false,
            deletedTasks: [...data.deletedTasks, data.selectedTask.apiData.id]
        }
    default:
        return data
    }
}