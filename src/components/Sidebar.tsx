import type { FC } from 'react'
import { css } from 'emotion'

import { SIDEBAR_WIDTH, CONTAINER_PADDING_SIZE } from '@/style'


const style = css({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: SIDEBAR_WIDTH,
    height: `calc(100vh - (${CONTAINER_PADDING_SIZE} * 2))`,
    marginRight: CONTAINER_PADDING_SIZE
})


export const Sidebar: FC = ({ children }) =>
    <aside className={style}>
        {children}
    </aside>
