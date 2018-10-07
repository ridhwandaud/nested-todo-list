import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TaskListOption from './TaskListOption'

const OptionsComponent = ({taskLists, children}) => 
    <div>
        {taskLists.map((tl, index) => <TaskListOption key={index} taskList={tl} />)}
        {children}
    </div>

OptionsComponent.propTypes = {
    taskLists: PropTypes.array.isRequired,
    children: PropTypes.element
}

const OptionsContainer = connect(
    state => ({
        taskLists: state.data.taskLists
    })
)(OptionsComponent)

export default OptionsContainer