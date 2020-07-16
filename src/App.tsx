import React, { FC } from 'react'
import { css } from 'emotion'
import { useRef, useEffect } from 'preact/hooks'
import { useSideEffectReducer } from 'react-use-side-effect-reducer'

import { reducer } from './reducer'
import Chart from './components/Chart'
import Sidebar from './components/Sidebar'
import {
    createInitialState,
    loadStateFromLocalStorage,
    saveStateToLocalStorage
} from './state'
import {
    BACKGROUND_COLOUR,
    TEXT_COLOUR,
    FONT_SIZE,
    CONTAINER_PADDING_SIZE
} from './style'


const rootStyle = css({
    display: 'flex',
    alignItems: 'start',
    minHeight: '100vh',
    minWidth: 'max-content',
    background: BACKGROUND_COLOUR,
    color: TEXT_COLOUR,
    fontSize: FONT_SIZE,
    padding: CONTAINER_PADDING_SIZE
})


const App: FC = () => {
    const chartRef = useRef<HTMLElement>(null)
    const [ state, dispatch ] = useSideEffectReducer(
        () => loadStateFromLocalStorage() ?? createInitialState(),
        reducer
    )
    useEffect(
        () => saveStateToLocalStorage(state),
        [ state ]
    )

    return (
        <div className={rootStyle}>
            <Sidebar dispatch={dispatch}
                charts={state.charts}
                activeChartIndex={state.activeChartIndex}
                apiKey={state.apiKey}
                searchState={state.search}
                screenshotState={state.screenshot}
                chartRef={chartRef}/>
            <Chart {...state.charts[state.activeChartIndex]}
                innerRef={chartRef}
                dispatch={dispatch}/>
        </div>
    )
}


export default App
