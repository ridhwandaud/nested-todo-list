import React from 'react'
import PropTypes from 'prop-types'

import ContextMenuOverlay from './contextMenuOverlay'

const ContextMenu = ({showing, onClose, children}) => 
    <ContextMenuOverlay showing={showing} onClose={onClose}>
        {children}
    </ContextMenuOverlay>

ContextMenu.propTypes = {
    showing: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
}

export default ContextMenu