import { h } from 'preact'
import { css } from 'emotion'
import { useRef } from 'preact/hooks'

import { useLocalStorageSideEffectReducer } from './hooks'
import { reducer } from './reducer'
import { Chart } from './components/Chart'
import { Sidebar } from './components/Sidebar'
import { createInitialState, escapeStateForExport, State } from './state'
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


export const App = () => {
    const [ state, dispatch ] = useLocalStorageSideEffectReducer({
        key: 'state',
        type: State,
        createInitialState,
        escapeState: escapeStateForExport,
        reducer
    })
    const chartRef = useRef<HTMLElement>(null)

    return (
        <div class={rootStyle}>
            <Sidebar dispatch={dispatch}
                charts={state.charts}
                activeChartIndex={state.activeChartIndex}
                apiKey={state.apiKey}
                searchState={state.search}
                screenshotState={state.screenshot}
                chartRef={chartRef}/>
            <Chart innerRef={chartRef}
                dispatch={dispatch}
                details={state.charts[state.activeChartIndex]}/>
        </div>
    )
}
