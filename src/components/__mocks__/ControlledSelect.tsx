import React, { FC, ChangeEvent } from 'react'

import { ControlledSelectProps } from '@/components/ControlledSelect'


export const ControlledSelect: FC<ControlledSelectProps> = ({
    id,
    value,
    onChange,
    children
}) => {
    function change(event: ChangeEvent<HTMLDivElement>) {
        onChange(Number((event.target as any).value))
    }

    return (
        <div id={id} className='mock-controlled-select' onChange={change}>
            {`Value: ${value}`}
            {children}
        </div>
    )
}
