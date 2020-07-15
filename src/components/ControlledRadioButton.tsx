import React, { FC } from 'react'
import { css } from 'emotion'

import Label from './Label'
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


const ControlledRadioButton: FC<Props> = ({
    id,
    checked,
    onCheck,
    children
}) =>
    <div className={containerStyle}>
        <input id={id}
            className={inputStyle}
            type='radio'
            checked={checked}
            onChange={onCheck}/>
        <Label target={id}>
            {children}
        </Label>
    </div>


export default ControlledRadioButton
