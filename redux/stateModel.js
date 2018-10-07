const stateModel = { 
    auth: {
        session: {
            id: '',
            user: ''
        },
        login: {
            loggedIn: false,
            inProgress: false,
            badAttemptMade: false,
            error: ''
        }, 
        register: {
            inProgress: false,
            badAttemptMade: false,
            error: ''
        }
    },
    data: {
        taskLists: [],
        taskListSelected: false,
        selectedTaskList: '',
        taskSelected: false,
        selectedTask: {
            apiData: {
                id: '',
                title: '',
                description: '',
                notes: []
            },
            stagedEdit: {
                title: '',
                description: ''
            }
        },
        deletedTasks: []
    },
    ui: {
        taskListMenu: {
            open: true,
            contextMenuOpen: false,
            openContextMenu: '',
            editingSelectedTaskList: false,
            editingSelectedTask: false,
            addNewTaskListDialogOpen: false
        },
        common: {
            userMenuOpen: false,
            creatingNewNote: false,
            loading: false
        },
        loginForm: {
            username: '',
            password: ''
        },
        registerForm: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    }, 
    api: {
        request: {
            target: '',
            method: '',
            payload: {}
        },
        response: {
            successful: true,
            error: '',
            code: 200,
            body: {}
        }
    }
}

export default stateModel