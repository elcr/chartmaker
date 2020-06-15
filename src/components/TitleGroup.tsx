import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'


type Props = {
    titles: string[]
}


const style = css({
    fontStyle: 'monospace',
    marginBottom: '1rem'
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
