import React from 'react'

import Field from './Field'

const PasswordField = ({...props}) => 
    <Field 
        id='txtPassword'
        type='password'
        label='Password'
        {...props}
    />

export default PasswordField