import React, { FC } from 'react'

import { ControlledRadioButtonProps } from '@/components/ControlledRadioButton'


export const ControlledRadioButton: FC<ControlledRadioButtonProps> = ({
    id,
    checked,
    onCheck,
    children
}) =>
    <div id={id} className='mock-controlled-radio-button' onChange={onCheck}>
        {`Checked: ${checked}`}
        {children}
    </div>
