import { h, FunctionComponent } from 'preact'
import { css, cx } from 'emotion'

import { BORDER, CONTAINER_PADDING_SIZE } from '../style'


const style = css({
    ':not(:last-of-type)': {
        borderBottom: BORDER,
        paddingBottom: CONTAINER_PADDING_SIZE,
        marginBottom: CONTAINER_PADDING_SIZE
    }
})


type Props = {
    class?: string
}


const SidebarGroup: FunctionComponent<Props> = ({ children, class: className }) =>
    <div class={cx(style, className)}>
        {children}
    </div>


export default SidebarGroup
