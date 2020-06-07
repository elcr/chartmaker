import React, { FC, ChangeEvent, FormEvent } from 'react'
import { css } from 'emotion'

import { DispatchProps } from './reducer'


export type APIKeyInputPageState = {
    apiKey: string
}


type Props = DispatchProps<'UpdateAPIKeyInputText' | 'ChangeAPIKey'> & APIKeyInputPageState


const pageStyle = css({
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
})


const formStyle = css({
    display: 'flex',
    padding: '1rem',
    border: '1px solid white'
})


export const APIKeyInputPage: FC<Props> = ({ dispatch, apiKey }) => {
    function updateKey(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        dispatch({
            tag: 'UpdateAPIKeyInputText',
            apiKey: event.currentTarget.value
        })
    }

    function confirmKey(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch({ tag: 'ChangeAPIKey', apiKey })
    }

    return (
        <main className={pageStyle}>
            <form className={formStyle} onSubmit={confirmKey}>
                <input type='password'
                    placeholder='Enter Last.fm API key'
                    autoFocus
                    onChange={updateKey}/>
                <button type='submit'>
                    Confirm
                </button>
            </form>
        </main>
    )
}
