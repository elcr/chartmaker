import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Label } from './Label'
import { SIDEBAR_LABEL_PADDING_SIZE, SIDEBAR_ITEM_PADDING_SIZE } from '../style'


type Props = {
    id: string
    checked: boolean
    onCheck: () => void
}


const containerStyle = css({
    display: 'flex',
    alignItems: 'center',
    ':not(:first-of-type)': {
        marginLeft: SIDEBAR_ITEM_PADDING_SIZE
    },
    ':not(:last-of-type)': {
        marginRight: SIDEBAR_ITEM_PADDING_SIZE
    }
})


const inputStyle = css({
    marginRight: SIDEBAR_LABEL_PADDING_SIZE
})


export const ControlledRadioButton: FunctionComponent<Props> = ({
    id,
    checked,
    onCheck,
    children
}) =>
    <div class={containerStyle}>
        <input id={id}
            class={inputStyle}
            type='radio'
            checked={checked}
            onChange={onCheck}/>
        <Label target={id}>
            {children}
        </Label>
    </div>
