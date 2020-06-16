import { h, FunctionComponent } from 'preact'

import { inputStyle } from '../style'


type Props = {
    id?: string
    value: number
    onChange: (value: number) => void
}


export const ControlledSelect: FunctionComponent<Props> = ({ onChange, ...props }) => {
    function change(event: Event) {
        event.preventDefault()
        const value = Number((event.currentTarget as any).value)
        onChange(value)
    }

    return <select {...props} class={inputStyle} onInput={change}/>
}
