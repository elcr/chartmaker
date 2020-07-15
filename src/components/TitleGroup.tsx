import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { TITLES_PADDING_SIZE, TITLES_FONT_SIZE } from '../style'


const style = css({
    marginBottom: TITLES_PADDING_SIZE,
    fontSize: TITLES_FONT_SIZE
})


const TitleGroup: FunctionComponent = ({ children }) =>
    <div class={style}>
        {children}
    </div>


export default TitleGroup
