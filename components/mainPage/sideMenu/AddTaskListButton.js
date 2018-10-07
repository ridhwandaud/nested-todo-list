import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import HoverItem from './optionsContainer/sideMenuOption/HoverItem'
import { toggleAddNewTaskListDialog } from '../../../redux/actions/ui/toggleAddTaskListDialog'

import activeImage from '../../../icons/add_active.svg'
import inactiveImage from '../../../icons/add_inactive.svg'

const IconWrapper = styled.div`
    display: inline-block;
    width: 25px;
`

const LabelWrapper = styled.div`
    display: inline-block;
`

const ButtonWrapper = styled.div`
    display: block;
    padding: 10px;
    &:hover {
        background: var(--active-color)
    }
`

const AddTaskListButtonComponent = ({onClick}) => {
    const draw = icon => 
        <ButtonWrapper onClick={onClick} >
            <IconWrapper>
                <img src={icon} />
            </IconWrapper>
            <LabelWrapper>
                Add new tasklist
            </LabelWrapper>
        </ButtonWrapper>

    const activeContent = draw(activeImage)
    const idleContent = draw(inactiveImage)

    return (
        <HoverItem hover={activeContent} noHover={idleContent} />
    )
}

const AddTaskListButton = connect(
    null,
    dispatch => ({
        onClick: () => dispatch(toggleAddNewTaskListDialog(true))
    })
)(AddTaskListButtonComponent)

export default AddTaskListButton