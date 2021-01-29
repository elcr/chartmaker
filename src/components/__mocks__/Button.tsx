import type { FC } from 'react'

import type { ButtonProps } from '@/components/Button'
import { cx } from 'emotion'


export const Button: FC<ButtonProps> = ({
    children,
    id,
    className,
    disabled,
    onClick
}) => {
    className = cx('mock-button', className)
    return (
        <div id={id} className={className} onClick={onClick}>
            {`Disabled: ${disabled}`}
            {children}
        </div>
    )
}
