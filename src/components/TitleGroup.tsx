import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'
import { CONTAINER_PADDING_SIZE } from '../style'


type Props = {
    titles: string[]
}


const style = css({
    marginBottom: CONTAINER_PADDING_SIZE
})


export const TitleGroup: FunctionComponent<Props> = ({ titles }) => {
    const titleElements = titles.map((title, index) =>
        <div key={index}>
            {title}
        </div>
    )
    return (
        <div class={style}>
            {titleElements}
        </div>
    )
}
