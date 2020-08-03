import React, { FC, ChangeEvent } from 'react'

import { inputStyle } from '@/style'


type Props = {
    id?: string
    value: number
    onChange: (value: number) => void
}


export const ControlledSelect: FC<Props> = ({ onChange, ...props }) => {
    function change(event: ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        const value = Number(event.currentTarget.value)
        onChange(value)
    }

    return <select {...props} className={inputStyle} onInput={change}/>
}
