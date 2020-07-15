import React, { FC } from 'react'
import { cx } from 'emotion'

import { buttonStyle } from '../style'


type Props = {
    className?: string
    disabled?: boolean
    onClick?: () => void
}


const Button: FC<Props> = ({ className, ...props }) =>
    <button {...props} className={cx(buttonStyle, className)}/>


export default Button
