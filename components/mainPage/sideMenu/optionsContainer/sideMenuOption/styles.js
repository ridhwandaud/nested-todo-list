import styled from 'styled-components'

export const MenuOptionWrapper = styled.div`
    --more-button-visibility: hidden;
    &: hover {
        --more-button-visibility: visible;
    }
`

export const AlwaysHighlight = styled.div`
    background: var(--active-color)
`

export const HighlightOnHover = styled.div`
    &:hover {
        background: var(--active-color)
    }
`

export const Label = styled.div`
    text-align: left;
    padding: 10px;
    display: inline-block;
`

export const ButtonPanel = styled.div`
    width: 40px;
    padding: 10px;
    display: inline-block;
    float: right;
`

export const IconWrapper = styled.div`
    display: block;
    &:hover {
        display: block
    }
`