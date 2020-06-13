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

    const activeChart = state.charts.find(chart =>
        chart.name === state.activeChartName
    )
    const chart = activeChart === undefined
        ? null
        : <Chart dispatch={dispatch}
            details={activeChart}
            draggedAlbumID={state.draggedAlbumID}/>

    return (
        <div className={rootStyle}>
            <Sidebar dispatch={dispatch}
                charts={state.charts}
                activeChartName={state.activeChartName}
                apiKey={state.apiKey}
                searchState={state.search}
                draggedAlbumID={state.draggedAlbumID}/>
            {chart}
        </div>
    )
}
