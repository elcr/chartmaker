import { h, FunctionComponent } from 'preact'

import { inputStyle } from '../style'


type Props = {
    id?: string
    min: number
    max: number
    step: number
    value: number
    onChange: (value: number) => void
    disabled?: boolean
}


export const ControlledSlider: FunctionComponent<Props> = ({
    onChange,
    ...props
}) => {
    function change(event: Event) {
        event.preventDefault()
        const value = Number((event.currentTarget as any).value)
        onChange(value)
    }

    return <input {...props} class={inputStyle} type='range' onInput={change}/>
}
