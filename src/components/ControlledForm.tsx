import { h, FunctionComponent } from 'preact'


type Props = {
    onSubmit: () => void
}


export const ControlledForm: FunctionComponent<Props> = ({ children, onSubmit }) => {
    function submit(event: Event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={submit}>
            {children}
        </form>
    )
}
