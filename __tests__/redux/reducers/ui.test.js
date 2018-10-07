import { taskListMenuReducer, commonUiReducer, commonUiActions, taskListMenuActions, 
    loginFormActions, loginFormReducer, registerFormActions, registerFormReducer } from '../../../redux/reducers/uiReducer'

import { testReducer } from './common'

describe('UI reducer', () => {
    it(commonUiActions.TOGGLE_USER_MENU, () => {
        testReducer({
            type: commonUiActions.TOGGLE_USER_MENU, 
            value: true 
        }, 
        commonUiReducer, 
        {
            userMenuOpen: true
        })
    })

    it(loginFormActions.UPDATE_USERNAME, () => {
        testReducer({
            type: loginFormActions.UPDATE_USERNAME, 
            value: 'x' 
        }, 
        loginFormReducer, 
        {
            username: 'x'
        })
    })

    it(loginFormActions.UPDATE_PASSWORD, () => {
        testReducer({
            type: loginFormActions.UPDATE_PASSWORD, 
            value: 'x' 
        }, 
        loginFormReducer, 
        {
            password: 'x'
        })
    })

    it(registerFormActions.UPDATE_USERNAME, () => {
        testReducer({
            type: registerFormActions.UPDATE_USERNAME, 
            value: 'x' 
        }, 
        registerFormReducer, 
        {
            username: 'x'
        })
    })

    it(registerFormActions.UPDATE_PASSWORD, () => {
        testReducer({
            type: registerFormActions.UPDATE_PASSWORD, 
            value: 'x' 
        }, 
        registerFormReducer, 
        {
            password: 'x'
        })
    })

    it(registerFormActions.UPDATE_CONFIRM_PASSWORD, () => {
        testReducer({
            type: registerFormActions.UPDATE_CONFIRM_PASSWORD, 
            value: 'x' 
        }, 
        registerFormReducer, 
        {
            confirmPassword: 'x'
        })
    })

    it(commonUiActions.TOGGLE_LOADING_BAR, () => {
        testReducer({
            type: commonUiActions.TOGGLE_LOADING_BAR,
            on: true
        }, commonUiReducer,{
            loading: true
        })
    })

    it(taskListMenuActions.TOGGLE_EDITING_SELECTED_TASKLIST, () => {
        testReducer({
            type: taskListMenuActions.TOGGLE_EDITING_SELECTED_TASKLIST,
            value: true
        }, taskListMenuReducer,{
            editingSelectedTaskList: true
        })
    })

    it(taskListMenuActions.TOGGLE_CONTEXT_MENU, () => {
        testReducer({
            type: taskListMenuActions.TOGGLE_CONTEXT_MENU,
            open: true,
            taskListId: '1'
        }, taskListMenuReducer,{
            contextMenuOpen: true, 
            openContextMenu: '1'
        })
    })

    it(taskListMenuActions.TOGGLE_ADD_NEW_TASKLIST_DIALOG, () => {
        testReducer({
            type: taskListMenuActions.TOGGLE_ADD_NEW_TASKLIST_DIALOG,
            value: true
        }, taskListMenuReducer,{
            addNewTaskListDialogOpen: true
        })
    })
})