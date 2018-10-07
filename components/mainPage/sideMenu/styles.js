import React from 'react'
import styled from 'styled-components'

export const MainContainer = styled.div`
    display: inline-block;
    height: 100%;
    background: #151b26;
    --active-color: #333a49;
    color: white
`

const SideMenuContentStyle = styled.div`
    width: 240;
    height: 100%;
    display: inline-block;
`

export const Content = ({children, visible}) => 
    visible ? <SideMenuContentStyle>{children}</SideMenuContentStyle> : <div></div>

export const Header = styled.div`
    padding: 10px;
`

export const Body = styled.div`
    overflow-y: auto;
    overflow-x: none;
    max-height: 80%;
    padding-bottom: 70px;
`

export const Footer = styled.div`
    position: relative;
    bottom: 0;
    width: 100%
`

export const ToggleBar = styled.div`
    display: inline-block;
    width: 40px;
    height: 100%;
    top: 0;
    vertical-align: top
`