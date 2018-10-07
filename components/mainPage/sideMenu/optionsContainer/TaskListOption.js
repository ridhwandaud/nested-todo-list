import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SideMenuOption from './sideMenuOption'
import { ContextMenu, ContextMenuOption } from '../../contextMenu'

import { toggleContextMenu } from '../../../../redux/actions/ui/toggleContextMenu'
import { beginTaskListEdit } from '../../../../redux/actions/data/beginTaskListEdit'
import { deleteTaskList } from '../../../../redux/actions/data/deleteTaskList'
import { selectTaskList } from '../../../../redux/actions/data/selectTaskList'


const TaskListOptionComponent = ({taskList, sessionId, taskListSelected, selectedTaskList, 
    contextMenuOpen, openContextMenu, toggleContextMenu, beginTaskListEdit, deleteTaskList, selectTaskList}) => {
    
    const { id, title } = taskList
    const selected = taskListSelected ? selectedTaskList === id : false
    const menuOpen = contextMenuOpen ? openContextMenu === id : false

    const closeMenu = () => toggleContextMenu(taskList.id, false)

    const withMenuClose = callback => () => {

        closeMenu()
        callback()
    }

    const conditionalContextMenuToggle = () => {
        if (contextMenuOpen){
            if (openContextMenu !== id){
                toggleContextMenu(id, true)
            } else {
                toggleContextMenu('', false)
            }
        } else {
            toggleContextMenu(id, true)
        }
    }

    return (
        <div onClick={() => selectTaskList(id)}>
            <SideMenuOption label={title} alwaysHighlight={ selected } 
                toggleContextMenu = { () => conditionalContextMenuToggle() } >

                <ContextMenu showing={menuOpen} onClose={closeMenu} >
                    <ContextMenuOption onClick={withMenuClose(() => beginTaskListEdit())}>Rename</ContextMenuOption>
                    <ContextMenuOption onClick={withMenuClose(() => deleteTaskList(sessionId, id))}>Delete</ContextMenuOption>
                </ContextMenu>

            </SideMenuOption> 
        </div>
    )
}

TaskListOptionComponent.propTypes = {
    taskList: PropTypes.object.isRequired, 
    sessionId: PropTypes.string.isRequired, 
    taskListSelected: PropTypes.bool.isRequired, 
    selectedTaskList: PropTypes.string.isRequired, 
    contextMenuOpen: PropTypes.bool.isRequired, 
    openContextMenu: PropTypes.string.isRequired, 
    toggleContextMenu: PropTypes.func.isRequired,
    beginTaskListEdit: PropTypes.func.isRequired,
    deleteTaskList: PropTypes.func.isRequired,
    selectTaskList: PropTypes.func.isRequired
}

const TaskListOption = connect(
    state => ({
        sessionId: state.auth.session.id,
        taskListSelected: state.data.taskListSelected,
        selectedTaskList: state.data.selectedTaskList,
        contextMenuOpen: state.ui.taskListMenu.contextMenuOpen,
        openContextMenu: state.ui.taskListMenu.openContextMenu
    }),
    dispatch => ({
        toggleContextMenu: (taskListId, open) => dispatch(toggleContextMenu(taskListId, open)),
        beginTaskListEdit: () => dispatch(beginTaskListEdit()),
        deleteTaskList: (session, id) => dispatch(deleteTaskList(session, id)),
        selectTaskList: (id) => dispatch(selectTaskList(id))
    })
)(TaskListOptionComponent)

export default TaskListOption