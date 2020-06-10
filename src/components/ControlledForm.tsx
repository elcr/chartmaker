import React, { FC, FormEvent } from 'react'


type Props = {
    onSubmit: () => void
}


export const ControlledForm: FC<Props> = ({ children, onSubmit }) => {
    function controlledOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={controlledOnSubmit}>
            {children}
        </form>
    )
}
