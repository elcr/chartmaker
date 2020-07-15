import { h, FunctionComponent } from 'preact'


type Props = {
    onSubmit: () => void
}


const ControlledForm: FunctionComponent<Props> = ({ children, onSubmit }) => {
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


export default ControlledForm
