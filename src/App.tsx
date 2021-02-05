import React, { FC, useRef, useEffect } from 'react'
import { css } from 'emotion'
import { useSideEffectReducer } from 'react-use-side-effect-reducer'

import { reducer } from '@/reducer'
import {
    createInitialState,
    loadStateFromLocalStorage,
    routeFromLocation,
    saveStateToLocalStorage
} from '@/utils'
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
    useEffect(
        () => {
            function popRoute() {
                dispatch({
                    tag: 'PopRoute',
                    route: routeFromLocation(location.pathname, location.hash)
                })
            }

            popRoute()
            window.addEventListener('popstate', popRoute)

            return () => window.removeEventListener('popstate', popRoute)
        },
        []
    )
    useEffect(
        () => {
            if (!state.routeState.loading && state.routeState.route === null) {
                dispatch({
                    tag: 'PushRoute',
                    route: { tag: 'Editor' },
                    replace: true
                })
            }
        },
        [ state.routeState ]
    )

    let page: JSX.Element | null
    if (state.routeState.loading) {
        page = null
    }
    else {
        switch (state.routeState.route?.tag) {
            case 'Editor':
                page = <Editor {...state} dispatch={dispatch} chartRef={chartRef}/>
                break
            case 'Viewer':
                page = (
                    <Viewer dispatch={dispatch}
                        chart={state.routeState.route.chart}
                        chartRef={chartRef}
                        highlighted={state.highlightedID}
                        screenshotState={state.screenshotState}/>
                )
                break
            case undefined:
                page = null
        }
    }

    return (
        <div className={rootStyle}>
            {page}
        </div>
    )
}
