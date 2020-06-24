import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'
import { CONTAINER_PADDING_SIZE } from '../style'


const style = css({
    marginBottom: CONTAINER_PADDING_SIZE
})


export const TitleGroup: FunctionComponent = ({ children }) =>
    <div class={style}>
        {children}
    </div>
