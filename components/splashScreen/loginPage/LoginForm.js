import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../../redux/actions/auth/login'
import { updateUsername, updatePassword } from '../../../redux/actions/ui/loginForm'

import * as FormBuilder from '../common/formBuilder'

import routes from '../../routes'

const LoginFormComponent = ({user, password, updateUsername, updatePassword, login, ...props}) => 
    <FormBuilder.GenericForm
        title='Log In'
        buttonText = 'Log In'
        onSubmit = {() => {
            updateUsername('')
            updatePassword('')
            login(user, password)
        }}
        mandatoryFields = {[user, password]}
        { ...props }
    >
        <FormBuilder.UsernameField onChange={updateUsername} value={user} />
        <FormBuilder.PasswordField onChange={updatePassword} value={password} />
        <p>{'Don\'t have an account?'} <Link to={routes.register}>Sign up</Link> here!</p>
    </FormBuilder.GenericForm>

const LoginForm = connect(
    state => ({
        badAttemptMade: state.auth.login.badAttemptMade,
        error: state.auth.login.error,
        user: state.ui.loginForm.username,
        password: state.ui.loginForm.password
    }),
    {
        updateUsername,
        updatePassword,
        login
    }
)(LoginFormComponent)

export default LoginForm