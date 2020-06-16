import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'


type Props = {
    onClick: () => void
    title: string
}


const style = css({
    cursor: 'pointer',
    userSelect: 'none'
})


export const AlbumActionButton: FunctionComponent<Props> = props =>
    <div {...props} class={style}/>
