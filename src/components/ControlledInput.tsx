import { h, FunctionComponent } from 'preact'

import { inputStyle } from '../style'


type Props = {
    id: string
    type?: 'text' | 'password'
    value: string
    onChange: (value: string) => void
}


const ControlledInput: FunctionComponent<Props> = ({ onChange, ...props }) => {
    function controlledOnChange(event: Event) {
        event.preventDefault()
        onChange((event.currentTarget as any).value)
    }

    return <input {...props} class={inputStyle} onInput={controlledOnChange}/>
}


export default ControlledInput
