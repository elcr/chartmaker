import { h, FunctionComponent } from 'preact'
import { cx } from 'emotion'

import { buttonStyle } from '../style'


type Props = {
    class?: string
    disabled?: boolean
    onClick?: () => void
}


export const Button: FunctionComponent<Props> = ({ class: className, ...props }) =>
    <button {...props} class={cx(buttonStyle, className)}/>
