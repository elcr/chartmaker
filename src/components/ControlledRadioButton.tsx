import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Label } from './Label'
import { SIDEBAR_LABEL_PADDING_SIZE } from '../style'


type Props = {
    id: string
    checked: boolean
    onCheck: () => void
    class?: string
}


const style = css({
    marginRight: SIDEBAR_LABEL_PADDING_SIZE
})


export const ControlledRadioButton: FunctionComponent<Props> = ({
    id,
    checked,
    onCheck,
    class: className,
    children
}) =>
    <div class={className}>
        <input id={id}
            class={style}
            type='radio'
            checked={checked}
            onChange={onCheck}/>
        <Label target={id}>
            {children}
        </Label>
    </div>
