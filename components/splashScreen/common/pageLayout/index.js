import React from 'react'
import { Panel } from 'react-bootstrap'

import * as Styles from './styles'

const PageLayout = FormComponent => () => 
    <Styles.BackGround>
        <Styles.Centered>
            <Panel>
                <Panel.Body>
                    <FormComponent/>
                </Panel.Body>
            </Panel>
        </Styles.Centered>
    </Styles.BackGround>

export default PageLayout