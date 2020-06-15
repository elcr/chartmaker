import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'


type Props = {
    target: string
}


const style = css({
    marginBottom: '0.25rem'
})


export const Label: FunctionComponent<Props> = ({ children, target }) =>
    <label class={style} for={target}>
        {children}
    </label>
