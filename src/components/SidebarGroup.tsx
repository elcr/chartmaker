import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'


const style = css({
    ':not(:last-of-type)': {
        borderBottom: '1px solid white',
        paddingBottom: '1rem',
        marginBottom: '1rem'
    },
    ':last-of-type': {
        overflowY: 'auto'
    }
})


export const SidebarGroup: FunctionComponent = ({ children }) =>
    <div class={style}>
        {children}
    </div>
