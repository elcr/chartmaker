import type { FC } from 'react'
import { cx } from 'emotion'

import { buttonStyle } from '@/style'


export type ButtonProps = {
    id?: string
    className?: string
    disabled?: boolean
    onClick?: () => void
    title?: string
}


export const Button: FC<ButtonProps> = ({ className, ...props }) =>
    <button {...props} className={cx(buttonStyle, className)}/>
