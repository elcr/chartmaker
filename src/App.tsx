import React from 'react'
import { css } from 'emotion'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
        : <Chart dispatch={dispatch} details={activeChart}/>

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={rootStyle}>
                <Sidebar dispatch={dispatch}
                    charts={state.charts}
                    activeChartName={state.activeChartName}
                    apiKey={state.apiKey}
                    searchState={state.search}/>
                {chart}
            </div>
        </DndProvider>
    )
}
