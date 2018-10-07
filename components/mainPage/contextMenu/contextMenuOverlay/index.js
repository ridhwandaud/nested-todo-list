import React, { Component } from 'react'

import * as Styles from './styles'

class ContextMenuOverlay extends Component {
    constructor(props){
        super(props)

        this.setWrapperRef = this.setWrapperRef.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    setWrapperRef(node){
        this.wrapperRef = node
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleClickOutside(event) {
        if (this.props.showing){
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.onClose()
            }
        }
    }

    render(){
        return this.props.showing ? (
            <div ref={this.setWrapperRef} style={{margin: 0}} >
                <Styles.Wrapper>
                    <Styles.Content>
                        <Styles.ContextMenuStyle>
                            {this.props.children}
                        </Styles.ContextMenuStyle>
                    </Styles.Content>
                </Styles.Wrapper>
            </div>
        ) : (<div></div>)
    }
}

export default ContextMenuOverlay