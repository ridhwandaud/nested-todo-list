import React from 'react'
import { connect } from 'react-redux'

import InputModal from './inputModal'

import { toggleAddNewTaskListDialog } from '../../../../redux/actions/ui/toggleAddTaskListDialog'
import { createTaskList } from '../../../../redux/actions/data/createTaskList'

const AddTaskListDialogComponent = (props) => 
    <InputModal {...props} header='New tasklist' confirmationLabel='Add' initialValue=''
        submit={text => props.submit(props.sessionId, text)} />

const AddTaskListDialog = connect(
    state => ({
        open: state.ui.taskListMenu.addNewTaskListDialogOpen,
        sessionId: state.auth.session.id
    }), dispatch => ({
        submit: (sessionId, text) => {
            dispatch(toggleAddNewTaskListDialog(false))
            dispatch(createTaskList(sessionId, text))
        },
        cancel: () => dispatch(toggleAddNewTaskListDialog(false))
    })
)(AddTaskListDialogComponent)

export default AddTaskListDialog