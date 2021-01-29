import type { FC, FormEvent } from 'react'


type Props = {
    onSubmit: () => void
}


export const ControlledForm: FC<Props> = ({ children, onSubmit }) => {
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={submit}>
            {children}
        </form>
    )
}
