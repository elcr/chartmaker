import React, { FC, FormEvent } from 'react'


type Props = {
    onSubmit: () => void
}


const ControlledForm: FC<Props> = ({ children, onSubmit }) => {
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


export default ControlledForm
