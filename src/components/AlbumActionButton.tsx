import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'


type Props = {
    onClick: () => void
    title: string
}


const style = css({
    background: 'none',
    border: 'none'
})


export const AlbumActionButton: FunctionComponent<Props> = props =>
    <button {...props} class={style}/>
