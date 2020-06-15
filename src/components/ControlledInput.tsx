import { h, FunctionComponent } from 'preact'
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


export const ControlledInput: FunctionComponent<Props> = ({ onChange, ...props }) => {
    function controlledOnChange(event: Event) {
        event.preventDefault()
        onChange((event.currentTarget as any).value)
    }

    return <input {...props} class={style} onInput={controlledOnChange}/>
}
