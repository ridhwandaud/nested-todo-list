import React from 'react'
import { connect } from 'react-redux'

import InputModal from './inputModal'

import { commitTaskListEdit } from '../../../../redux/actions/data/commitTaskListEdit'
import { cancelTaskListEdit } from '../../../../redux/actions/data/cancelTaskListEdit'

const RenameTaskListDialogComponent = (props) => 
    <InputModal {...props} header='Rename tasklist' confirmationLabel='Save' 
        submit={text => props.submit(props.sessionId, props.selectedTaskList, text)}/>

const RenameTaskListDialog = connect(
    state => ({
        open: state.ui.taskListMenu.editingSelectedTaskList,
        selectedTaskList: state.data.selectedTaskList,
        sessionId: state.auth.session.id,
        initialValue: 
            state.data.taskListSelected 
                ? state.data.taskLists.find(t => t.id === state.data.selectedTaskList).title
                : ''
    }), dispatch => ({
        submit: (sessionId, selectedTaskList, text) => dispatch(commitTaskListEdit(sessionId, selectedTaskList, text)),
        cancel: () => dispatch(cancelTaskListEdit())
    })
)(RenameTaskListDialogComponent)

export default RenameTaskListDialog