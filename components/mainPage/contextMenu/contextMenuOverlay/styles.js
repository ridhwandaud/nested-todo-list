import styled from 'styled-components'

export const ContextMenuStyle = styled.div`
    border: 1px solid lightGray;
    border-radius: 15px;
    background: white;
`

export const Wrapper = styled.div`
    position: relative;
`

export const Content = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    zIndex: 999;
`