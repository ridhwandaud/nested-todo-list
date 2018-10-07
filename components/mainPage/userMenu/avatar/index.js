import React from 'react'
import AvatarStyle from './styles'

const Avatar = ({name, ...props}) =>
    <div {...props}>
        <AvatarStyle>{name.charAt(0).toUpperCase()}</AvatarStyle>
    </div>

export default Avatar