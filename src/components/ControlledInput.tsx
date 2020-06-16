import { h, FunctionComponent } from 'preact'
import { css, cx } from 'emotion'
import { inputStyle } from '../style'


type Props = {
    id: string
    type?: 'text' | 'password'
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}


const style = cx(
    inputStyle,
    css({ width: '100%' })
)


export const ControlledInput: FunctionComponent<Props> = ({ onChange, ...props }) => {
    function controlledOnChange(event: Event) {
        event.preventDefault()
        onChange((event.currentTarget as any).value)
    }

    return <input {...props} class={style} onInput={controlledOnChange}/>
}
