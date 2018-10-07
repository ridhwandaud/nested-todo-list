import React from 'react'
import PropTypes from 'prop-types'

import ContextMenuButton from './ContextMenuButton'
import * as Styles from './styles'

const SideMenuOption = ({label, alwaysHighlight, toggleContextMenu, children}) => {
    const content = (Highlighter) => 
        <Styles.MenuOptionWrapper>
            <Highlighter>
                <Styles.Label>
                    {label}
                </Styles.Label>
                <Styles.ButtonPanel>
                    <Styles.IconWrapper>
                        <ContextMenuButton toggle={toggleContextMenu}>
                            {children}
                        </ContextMenuButton>
                    </Styles.IconWrapper>
                </Styles.ButtonPanel>
            </Highlighter>
        </Styles.MenuOptionWrapper>

    const alwaysHighlighted = content(Styles.AlwaysHighlight)
    const idle = content(Styles.HighlightOnHover)

    return alwaysHighlight ? alwaysHighlighted : idle
}

SideMenuOption.propTypes = {
    label: PropTypes.string.isRequired,
    alwaysHighlight: PropTypes.bool.isRequired,
    contextMenu: PropTypes.element.isRequired,
    contextMenuOpen: PropTypes.bool.isRequired,
    toggleContextMenu: PropTypes.func.isRequired
}

export default SideMenuOption