import React from 'react'
import PropTypes from 'prop-types'

import Style from './styles'

const ContextMenuOption = ({children, onClick}) => 
    <Style onClick={onClick}>{children}</Style>

ContextMenuOption.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ContextMenuOption