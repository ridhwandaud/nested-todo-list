import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ContextMenu, ContextMenuOption } from '../contextMenu'
import Avatar from './avatar'

import { logout } from '../../../redux/actions/auth/logout'
import { toggleUserMenu } from '../../../redux/actions/ui/toggleUserMenu'

const UserMenuComponent = ({user, logout, open, toggleUserMenu}) => 
    <div>
        <Avatar name={user} onClick={() => toggleUserMenu(!open)} />
        <ContextMenu showing={open} onClose={() => toggleUserMenu(false)}>
            <ContextMenuOption onClick={() => logout()}>Log Out</ContextMenuOption>
        </ContextMenu>
    </div>

UserMenuComponent.propTypes = {
    user: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    toggleUserMenu: PropTypes.func.isRequired
}

const UserMenu = connect(
    state => ({
        user: state.auth.session.user,
        open: state.ui.common.userMenuOpen
    }), { 
        logout,
        toggleUserMenu
    }
)(UserMenuComponent)

export default UserMenu