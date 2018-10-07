import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { register } from '../../../redux/actions/auth/register'
import { updateUsername, updatePassword, updateConfirmPassword } from '../../../redux/actions/ui/registerForm'

import * as FormBuilder from '../common/formBuilder'

import routes from '../../routes'

const ConfirmPasswordField = ({...props}) => 
    <FormBuilder.Field 
        id='txtConfirmPassword'
        type='password'
        label='Confirm password'
        {...props}
    />

const RegisterFormComponent = ({user, password, confirmPassword, updateUsername, updatePassword, updateConfirmPassword, register, ...props}) => {
    const passwordMismatch = password !== confirmPassword 
    const passwordValidationState = passwordMismatch ? 'error' : null

    return (
        <FormBuilder.GenericForm
            title='Sign Up'
            buttonText = 'Sign Up'
            onSubmit = {() => {
                updateUsername('')
                updatePassword('')
                updateConfirmPassword('')
                register(user, password)
            }}
            mandatoryFields={ [user, password, confirmPassword] }
            disabled = {passwordMismatch}
            { ...props }
        >
            <FormBuilder.UsernameField onChange={updateUsername} value={user} />
            <FormBuilder.PasswordField onChange={updatePassword} value={password} />
            <ConfirmPasswordField onChange={updateConfirmPassword} value={confirmPassword} validationState={passwordValidationState} />
            <p>{'Already have an account? '} <Link to={routes.login}>Sign in</Link> here!</p>
        </FormBuilder.GenericForm>
    )
}

const RegisterForm = connect(
    state => ({
        badAttemptMade: state.auth.register.badAttemptMade,
        error: state.auth.register.error,
        user: state.ui.registerForm.username,
        password: state.ui.registerForm.password,
        confirmPassword: state.ui.registerForm.confirmPassword
    }),
    {
        updateUsername,
        updatePassword,
        updateConfirmPassword,
        register
    }
)(RegisterFormComponent)

export default RegisterForm