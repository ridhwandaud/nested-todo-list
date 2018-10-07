import React from 'react'
import PropTypes from 'prop-types'
import { Button, Alert, PageHeader } from 'react-bootstrap'

import Header from './styles'

const GenericForm = ({title, onSubmit, badAttemptMade, error, mandatoryFields, disabled, children}) =>
    <div> 
        <PageHeader><Header>{title}</Header></PageHeader>
        <form onSubmit={event => {
            event.preventDefault()
            onSubmit()
        }}>
            { badAttemptMade ? 
                <Alert bsStyle='danger'>
                    {error}
                </Alert> : <div></div> }

            {children}

            <Button type='submit' disabled={mandatoryFields.some(field => field.length === 0) || disabled} >{title}</Button>
        </form>
    </div>

GenericForm.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    badAttemptMade: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    mandatoryFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool.isRequired,
    children: PropTypes.element
}

export default GenericForm