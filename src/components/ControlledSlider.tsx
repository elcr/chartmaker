import React, { FC, ChangeEvent } from 'react'

import { inputStyle, SIDEBAR_ITEM_PADDING_SIZE } from '../style'
import { css, cx } from 'emotion'
import Label from './Label'


type Props = {
    id: string
    min: number
    max: number
    step: number
    value: number
    onChange: (value: number) => void
    disabled?: boolean
}


const containerStyle = css({
    display: 'flex',
    alignItems: 'center'
})


const baseInputStyle = css({
    margin: `0 ${SIDEBAR_ITEM_PADDING_SIZE}`
})


const ControlledSlider: FC<Props> = ({
    id,
    onChange,
    children,
    value,
    ...props
}) => {
    function change(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const value = Number(event.currentTarget.value)
        onChange(value)
    }

    const style = cx(baseInputStyle, inputStyle)

    return (
        <div className={containerStyle}>
            <Label target={id}>
                {children}
            </Label>
            <input {...props}
                id={id}
                className={style}
                type='range'
                onChange={change}
                value={value}/>
            <Label target={id}>
                {value}
            </Label>
        </div>
    )
}


export default ControlledSlider
