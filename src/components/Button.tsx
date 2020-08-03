import React, { FC } from 'react'
import { cx } from 'emotion'

import { buttonStyle } from '@/style'


type Props = {
    className?: string
    disabled?: boolean
    onClick?: () => void
}


export const Button: FC<Props> = ({ className, ...props }) =>
    <button {...props} className={cx(buttonStyle, className)}/>
