import React, { FC, useRef, useEffect } from 'react'
import { css } from 'emotion'
import { useSideEffectReducer } from 'react-use-side-effect-reducer'

import { reducer } from '@/reducer'
import {
    createInitialState,
    loadStateFromLocalStorage,
    saveStateToLocalStorage
} from '@/state'
import {
    BACKGROUND_COLOUR,
    TEXT_COLOUR,
    FONT_SIZE,
    CONTAINER_PADDING_SIZE
} from '@/style'
import { EditorSidebar } from '@/components/EditorSidebar'
import { EditorChart } from '@/components/EditorChart'


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


export const App: FC = () => {
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
            <EditorSidebar dispatch={dispatch}
                charts={state.charts}
                activeChartIndex={state.activeChartIndex}
                apiKey={state.apiKey}
                searchState={state.search}
                screenshotState={state.screenshot}
                chartRef={chartRef}/>
            <EditorChart {...state.charts[state.activeChartIndex]!}
                innerRef={chartRef}
                dispatch={dispatch}
                highlighted={state.highlightedID}/>
        </div>
    )
}
