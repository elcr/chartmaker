import React, { FC, ChangeEvent } from 'react'

import { inputStyle } from '@/style'


type Props = {
    id: string
    type?: 'text' | 'password'
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}


const ControlledInput: FC<Props> = ({ onChange, ...props }) => {
    function controlledOnChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        onChange(event.currentTarget.value)
    }

    return <input {...props}
        className={inputStyle}
        onChange={controlledOnChange}/>
}


export default ControlledInput
