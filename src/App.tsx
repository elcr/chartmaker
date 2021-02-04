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
import { Editor } from '@/pages/Editor'
import { Viewer } from '@/pages/Viewer'


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

    const page = state.viewing === undefined
        ? <Editor {...state} dispatch={dispatch} chartRef={chartRef}/>
        : <Viewer dispatch={dispatch}
            chart={state.viewing}
            chartRef={chartRef}
            highlighted={state.highlightedID}
            screenshotState={state.screenshot}/>

    return (
        <div className={rootStyle}>
            {page}
        </div>
    )
}
