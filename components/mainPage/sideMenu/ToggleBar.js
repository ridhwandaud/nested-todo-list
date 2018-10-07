import React from 'react'
import { connect } from 'react-redux'

import HoverItem from './optionsContainer/sideMenuOption/HoverItem'
import { toggleSideMenu } from '../../../redux/actions/ui/toggleSideMenu'

import activeIcon from '../../../icons/expand_active.svg'
import inactiveIcon from '../../../icons/expand_inactive.svg'

const ToggleBarComponent = ({open, toggleSideMenu}) => {
    const content = active => <img src={active ? activeIcon : inactiveIcon } onClick={() => toggleSideMenu(!open)} />
    
    return (
        <HoverItem hover={content(true)} noHover={content(false)} />
    )
}

const ToggleBar = connect(
    state => ({
        open: state.ui.taskListMenu.open
    }), dispatch => ({
        toggleSideMenu: open => dispatch(toggleSideMenu(open))
    })
)(ToggleBarComponent)

export default ToggleBar