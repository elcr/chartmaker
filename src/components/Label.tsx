import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { SIDEBAR_LABEL_PADDING_SIZE } from '../style'


type Props = {
    target: string
}


const style = css({
    marginBottom: SIDEBAR_LABEL_PADDING_SIZE
})


const Label: FunctionComponent<Props> = ({ children, target }) =>
    <label class={style} for={target}>
        {children}
    </label>


export default Label
