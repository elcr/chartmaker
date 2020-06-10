import React, { FC, ChangeEvent } from 'react'
import { css } from 'emotion'


type Props = {
    id: string
    type?: 'text' | 'password'
    placeholder?: string
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}


const style = css({
    width: '100%'
})


export const ControlledInput: FC<Props> = ({ onChange, ...props }) => {
    function controlledOnChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        onChange(event.currentTarget.value)
    }

    return <input {...props} className={style} onChange={controlledOnChange}/>
}
