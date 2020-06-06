import React from 'react'
import { css } from 'emotion'

import { useLocalStorageSideEffectReducer } from './hooks'
import { getInitialState, reducer } from './reducer'
import { APIKeyInputPage } from './APIKeyInputPage'
import { ChartEditorPage } from './ChartEditorPage'


const rootStyle = css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '0.875rem'
})


export const App = () => {
    const [ state, dispatch ] = useLocalStorageSideEffectReducer(
        'state',
        getInitialState,
        reducer
    )

    let content: JSX.Element
    switch (state.page) {
        case 'APIKeyInput': {
            content = <APIKeyInputPage dispatch={dispatch} text={state.key}/>
            break
        }
        case 'ChartEditor':
            content = <ChartEditorPage key={state.key}/>
    }

    return (
        <div className={rootStyle}>
            {content}
        </div>
    )
}
