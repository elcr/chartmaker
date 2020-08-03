import React, { FC, ChangeEvent } from 'react'

import { ControlledSliderProps } from '@/components/ControlledSlider'


export const ControlledSlider: FC<ControlledSliderProps> = ({
    id,
    min,
    max,
    step,
    value,
    disabled,
    onChange,
    children
}) => {
    function change(event: ChangeEvent<HTMLDivElement>) {
        onChange(Number((event.target as any).value))
    }

    return (
        <div id={id} className='mock-controlled-slider' onChange={change}>
            {`Min: ${min}`}
            {`Max: ${max}`}
            {`Step: ${step}`}
            {`Value: ${value}`}
            {`Disabled: ${disabled}`}
            {children}
        </div>
    )
}
