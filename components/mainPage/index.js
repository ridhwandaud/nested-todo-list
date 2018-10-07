import React from 'react'
import { Jumbotron } from 'react-bootstrap'

import SideMenu from './sideMenu'
import UserMenu from './userMenu'

import * as Styles from './styles'

const MainPageLayout = () => 
    <Styles.Wrapper>
        <Styles.LeftSection>
            <SideMenu />
        </Styles.LeftSection>
        <Styles.LeftSection>
            <Jumbotron>
                <h1>Placeholder</h1>
                <p>Content coming soon</p>
            </Jumbotron>
        </Styles.LeftSection>
        <Styles.RightSection>
            <UserMenu /> 
        </Styles.RightSection>
    </Styles.Wrapper>

export default MainPageLayout