import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OptionsContainer from './optionsContainer'
import * as Modals from './modals'
import AddTaskListButton from './AddTaskListButton'
import ToggleBar from './ToggleBar'

import * as Styles from './styles'

const SideMenuComponent = ({open}) => 
    <Styles.MainContainer>
        <Styles.Content visible={open}>
            <Styles.Header><b>Task lists</b></Styles.Header>

            <Styles.Body>
                <OptionsContainer>
                    <Modals.RenameTaskListDialog />
                </OptionsContainer>
            </Styles.Body>

            <Styles.Footer>
                <AddTaskListButton />
                <Modals.AddTaskListDialog />
            </Styles.Footer>
        </Styles.Content>

        <Styles.ToggleBar>
            <ToggleBar />
        </Styles.ToggleBar>
    </Styles.MainContainer>

SideMenuComponent.propTypes = {
    open: PropTypes.bool.isRequired
}

const SideMenu = connect(
    state => ({
        open: state.ui.taskListMenu.open
    })
)(SideMenuComponent)

export default SideMenu