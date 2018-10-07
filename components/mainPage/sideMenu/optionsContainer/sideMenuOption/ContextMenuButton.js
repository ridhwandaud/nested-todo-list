import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import HoverItem from './HoverItem'

import activeImage from '../../../../../icons/more_active.svg'
import inactiveImage from '../../../../../icons/more_inactive.svg'

const MoreIconWrapper = styled.div`
    visibility: var(--more-button-visibility);
`

const MoreIcon = () => {
    const element = image => (<img src={image} />)
    const active = element(activeImage)
    const inactive = element(inactiveImage)

    return ( <MoreIconWrapper><HoverItem hover={ active } noHover={ inactive } /></MoreIconWrapper>)
}

MoreIcon.propTypes = {
    visible: PropTypes.bool
}

const ContextMenuButton = ({toggle, children}) => (
    <div>
        <div onClick={() => toggle()}><MoreIcon/></div>     
        {children}
    </div>
)

ContextMenuButton.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default ContextMenuButton