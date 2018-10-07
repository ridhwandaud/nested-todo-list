import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, FormGroup, FormControl, Button } from 'react-bootstrap'

import * as Styles from './styles'

class InputModal extends Component {
    constructor(props){
        super(props)

        this.onChange = this.onChange.bind(this)

        this.state = {
            text: props.initialValue
        }
    }

    onChange(event){
        this.setState({text: event.target.value})
    }

    render(){
        const { header, initialValue, confirmationLabel, open, submit, cancel } = this.props

        return (
            <Modal bsSize='small' open={open} show={open} onHide={cancel} >
                <Modal.Header>{header}</Modal.Header>
                <Modal.Body>
                    <Styles.ModalBorder>
                        <Form horizontal onSubmit={e => { 
                            e.preventDefault()
                            submit(this.state.text)    
                        } } >
                            <FormGroup>
                                <FormControl 
                                    type='text' 
                                    defaultValue ={initialValue}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type='submit'>{confirmationLabel}</Button>
                                <Button onClick={() => cancel()}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Styles.ModalBorder>
                </Modal.Body>
            </Modal>
        )
    }
}

InputModal.propTypes = {
    header: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    confirmationLabel: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
}

export default InputModal