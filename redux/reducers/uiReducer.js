import { combineReducers } from 'redux'

import stateModel from '../stateModel'

export const loginFormActions = {
    UPDATE_USERNAME: 'LOGIN_UPDATE_USERNAME',
    UPDATE_PASSWORD: 'LOGIN_UPDATE_PASSWORD'
}

export const loginFormReducer = (loginFormState = stateModel.ui.loginForm, action) => {
    switch(action.type){
    case loginFormActions.UPDATE_USERNAME:
        return { ...loginFormState, username: action.value }
    case loginFormActions.UPDATE_PASSWORD:
        return { ...loginFormState, password: action.value }
    default:
        return loginFormState
    }
}

export const registerFormActions = {
    UPDATE_USERNAME: 'REG_UPDATE_USERNAME',
    UPDATE_PASSWORD: 'REG_UPDATE_PASSWORD',
    UPDATE_CONFIRM_PASSWORD: 'REG_UPDATE_CONFIRM_PASSWORD'
}

export const registerFormReducer = (registerFormState = stateModel.ui.registerForm, action) => {
    switch(action.type){
    case registerFormActions.UPDATE_USERNAME:
        return { ...registerFormState, username: action.value }
    case registerFormActions.UPDATE_PASSWORD:
        return { ...registerFormState, password: action.value }
    case registerFormActions.UPDATE_CONFIRM_PASSWORD:
        return { ...registerFormState, confirmPassword: action.value }    
    default:
        return registerFormState
    }
}

export const taskListMenuActions = {
    TOGGLE_EDITING_SELECTED_TASKLIST: 'TOGGLE_EDITING_SELECTED_TASKLIST',
    TOGGLE_CONTEXT_MENU: 'TOGGLE_CONTEXT_MENU',
    TOGGLE_ADD_NEW_TASKLIST_DIALOG: 'TOGGLE_ADD_NEW_TASKLIST_DIALOG',
    TOGGLE_SIDE_MENU: 'TOGGLE_SIDE_MENU'
}

export const taskListMenuReducer = (taskListMenuState=stateModel.ui.taskListMenu, action) => {
    switch(action.type){
    case taskListMenuActions.TOGGLE_SIDE_MENU:
        return { ...taskListMenuState, open: action.value }
    case taskListMenuActions.TOGGLE_EDITING_SELECTED_TASKLIST:
        return { ...taskListMenuState, editingSelectedTaskList: action.value }
    case taskListMenuActions.TOGGLE_CONTEXT_MENU: 
        return {...taskListMenuState, contextMenuOpen: action.open, openContextMenu: action.taskListId}
    case taskListMenuActions.TOGGLE_ADD_NEW_TASKLIST_DIALOG:
        return { ...taskListMenuState, addNewTaskListDialogOpen: action.value }
    default:
        return taskListMenuState
    }
}

export const commonUiActions = {
    TOGGLE_LOADING_BAR: 'TOGGLE_LOADING_BAR',
    TOGGLE_USER_MENU: 'TOGGLE_USER_MENU'
}

export const commonUiReducer = (commonUiState=stateModel.ui.common, action) => {
    switch(action.type){
    case commonUiActions.TOGGLE_LOADING_BAR:
        return { ...commonUiState, loading: action.on }
    case commonUiActions.TOGGLE_USER_MENU:
        return { ...commonUiState, userMenuOpen: action.value }
    default:
        return commonUiState
    }
}

export const uiReducer = combineReducers({
    taskListMenu: taskListMenuReducer,
    common: commonUiReducer,
    loginForm: loginFormReducer,
    registerForm: registerFormReducer
})