import { h, FunctionComponent } from 'preact'

import { inputStyle, SIDEBAR_ITEM_PADDING_SIZE } from '../style'
import { css, cx } from 'emotion'
import { Label } from './Label'


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


export const ControlledSlider: FunctionComponent<Props> = ({
    id,
    onChange,
    children,
    value,
    ...props
}) => {
    function change(event: Event) {
        event.preventDefault()
        const value = Number((event.currentTarget as any).value)
        onChange(value)
    }

    const style = cx(baseInputStyle, inputStyle)

    return (
        <div class={containerStyle}>
            <Label target={id}>
                {children}
            </Label>
            <input {...props}
                id={id}
                class={style}
                type='range'
                onInput={change}
                value={value}/>
            <Label target={id}>
                {value}
            </Label>
        </div>
    )
}
