import type { FC } from 'react'
import { css, cx } from 'emotion'

import { BORDER, CONTAINER_PADDING_SIZE } from '@/style'


const style = css({
    ':first-of-type': {
        borderTop: BORDER,
        paddingTop: CONTAINER_PADDING_SIZE
    },
    ':not(:last-of-type)': {
        borderBottom: BORDER,
        paddingBottom: CONTAINER_PADDING_SIZE,
        marginBottom: CONTAINER_PADDING_SIZE
    }
})


export type SidebarGroupProps = {
    className?: string
}


export const SidebarGroup: FC<SidebarGroupProps> = ({ children, className }) =>
    <div className={cx(style, className)}>
        {children}
    </div>
