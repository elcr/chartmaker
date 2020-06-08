import React from 'react'
import { css } from 'emotion'

import { useLocalStorageSideEffectReducer } from './hooks'
import { reducer } from './reducer'
import { Chart } from './components/Chart'
import { Sidebar } from './components/Sidebar'
import { createInitialState } from './state'


const rootStyle = css({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '0.875rem',
    padding: '1rem'
})


export const App = () => {
    const [ state, dispatch ] = useLocalStorageSideEffectReducer(
        'state',
        createInitialState,
        reducer
    )

    return (
        <div className={rootStyle}>
            <Sidebar dispatch={dispatch}
                charts={state.charts}
                activeChart={state.activeChart}/>
            <Chart {...state.activeChart}/>
        </div>
    )
}
