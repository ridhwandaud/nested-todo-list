import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HoverItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hover: false
        }
    }

    render(){
        const { hover, noHover } = this.props
        const content = this.state.hover ? hover : noHover

        return (
            <div
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})} >
                {content}
            </div>)
    }
}

HoverItem.propTypes = {
    hover: PropTypes.object,
    noHover: PropTypes.object
}

export default HoverItem