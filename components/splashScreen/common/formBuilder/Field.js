import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const Field = ({id, label, validationState, onChange, ...props}) => 
    <FormGroup controlId={id} validationState={validationState} >
        <ControlLabel>{label}</ControlLabel>
        <FormControl onChange={event => onChange(event.target.value)} { ...props} />
    </FormGroup>

export default Field