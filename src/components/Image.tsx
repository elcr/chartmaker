import { h, FunctionComponent } from 'preact'
import { css, cx } from 'emotion'


type Props = {
    url: string
    alt?: string
    title?: string
    class?: string
}


const style = css({
    maxWidth: '100%'
})


export const Image: FunctionComponent<Props> = ({ url, class: className, ...props }) =>
    <img {...props}
        class={cx(style, className)}
        src={url}
        loading='lazy'/>
