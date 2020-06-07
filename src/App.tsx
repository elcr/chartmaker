import React from 'react'
import { css } from 'emotion'

import { useLocalStorageSideEffectReducer } from './hooks'
import { getInitialState, reducer } from './reducer'
import { Chart } from './components/Chart'


const rootStyle = css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '0.875rem',
    padding: '1rem'
})


export const App = () => {
    const [ state,  ] = useLocalStorageSideEffectReducer(
        'state',
        getInitialState,
        reducer
    )

    return (
        <div className={rootStyle}>
            <Chart {...state.activeChart}/>
        </div>
    )
}
