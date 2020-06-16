import { h, FunctionComponent } from 'preact'
import { cx } from 'emotion'

import { inputStyle } from '../style'


type Props = {
    class?: string
    onClick?: () => void
}


export const Button: FunctionComponent<Props> = ({ class: className, ...props }) =>
    <button {...props} class={cx(inputStyle, className)}/>
