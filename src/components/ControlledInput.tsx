import React, { FC, ChangeEvent } from 'react'

import { inputStyle } from '@/style'


export type ControlledInputProps = {
    id: string
    type?: 'text' | 'password'
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}


export const ControlledInput: FC<ControlledInputProps> = ({ onChange, ...props }) => {
    function controlledOnChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        onChange(event.target.value)
    }

    return <input {...props}
        className={inputStyle}
        onChange={controlledOnChange}/>
}
