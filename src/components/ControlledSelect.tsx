import React, { FC, ChangeEvent } from 'react'

import { inputStyle } from '@/style'


export type ControlledSelectProps = {
    id?: string
    value: number
    onChange: (value: number) => void
}


export const ControlledSelect: FC<ControlledSelectProps> = ({ onChange, ...props }) => {
    function change(event: ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        const value = Number(event.target.value)
        onChange(value)
    }

    return <select {...props} className={inputStyle} onChange={change}/>
}
