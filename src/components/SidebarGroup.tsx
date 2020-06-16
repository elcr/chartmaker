import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { BORDER, CONTAINER_PADDING_SIZE } from '../style'


const style = css({
    ':not(:last-of-type)': {
        borderBottom: BORDER,
        paddingBottom: CONTAINER_PADDING_SIZE,
        marginBottom: CONTAINER_PADDING_SIZE
    },
    ':last-of-type': {
        overflowY: 'auto'
    }
})


export const SidebarGroup: FunctionComponent = ({ children }) =>
    <div class={style}>
        {children}
    </div>
