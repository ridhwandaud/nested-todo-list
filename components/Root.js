import React from 'react'
import { Route, HashRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginPage from './splashScreen/loginPage'
import RegisterPage from './splashScreen/registerPage'

import MainPageLayout from './mainPage'
import routes from './routes'

const LoginGateKeeper = (ChildComponent) => (({loggedIn}) => loggedIn ? <Redirect to={routes.default} /> : <ChildComponent />)
const MainGateKeeper = (ChildComponent) => (({loggedIn}) => loggedIn ? <ChildComponent /> : <Redirect to={routes.login} />)

const ConnectLoginStatus = (ChildComponent) => 
    connect(
        state => ({loggedIn: state.auth.login.loggedIn})
    )(ChildComponent)

const mainPage = ConnectLoginStatus(MainGateKeeper(MainPageLayout))
const loginPage = ConnectLoginStatus(LoginGateKeeper(LoginPage))
const registerPage = ConnectLoginStatus(LoginGateKeeper(RegisterPage))

const Root = () => 
    <div>
        <HashRouter>
            <div>
                <Route exact path={routes.default} component={mainPage} />
                <Route exact path={routes.login} component={loginPage} />
                <Route exact path={routes.register} component={registerPage} />
            </div>
        </HashRouter>
    </div>

export default Root