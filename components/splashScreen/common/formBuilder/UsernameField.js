import React from 'react'

import Field from './Field'

const UsernameField = ({...props}) => 
    <Field 
        id='txtUser'
        type='text'
        label='Username'
        {...props}
    />

export default UsernameField