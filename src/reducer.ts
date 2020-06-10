import { Dispatch as _Dispatch } from 'react'

import { SideEffectUpdate } from './hooks'
import { Chart, State, createChart, SearchState, Album } from './state'
import { readInputFileText, splitArrayAtIndex } from './utils'


type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }
    | { tag: 'UpdateActiveChart', chart: Chart }
    | { tag: 'PromptForNewChart' }
    | { tag: 'ShowChartNameTakenMessage' }
    | { tag: 'AddNewChart', name: string }
    | { tag: 'PromptToRenameActiveChart' }
    | { tag: 'RenameActiveChart', name: string }
    | { tag: 'PromptToDeleteActiveChart' }
    | { tag: 'DeleteActiveChart' }
    | { tag: 'PromptToSelectImportJSON' }
    | { tag: 'ShowInvalidImportJSONMessage' }
    | { tag: 'UpdateAllState', state: State }
    | { tag: 'PromptToExportState' }
    | { tag: 'CancelSearchRequest' }
    | { tag: 'SendSearchRequest' }
    | { tag: 'UpdateSearchState', state: SearchState }
    | { tag: 'UpdateSearchQuery', query: string }


export type ActionTag = Action['tag']
export type Dispatch<T extends ActionTag = ActionTag> = _Dispatch<Extract<Action, { tag: T }>>
export type DispatchProps<T extends ActionTag = ActionTag> = {
    dispatch: Dispatch<T>
}


type SearchResult = {
    results: {
        albummatches: {
            album: {
                name: string
                artist: string
                image: {
                    '#text': string
                    size: 'small' | 'medium' | 'large' | 'extralarge'
                }[]
            }[]
        }
    }
}


function formatSearchResult(result: SearchResult): Album[] {
    return result.results.albummatches.album.map(album => ({
        artist: album.artist,
        title: album.name,
        image: {
            smallURL: album.image[0]['#text'],
            largeURL: album.image[album.image.length - 1]['#text']
        }
    }))
}


export function reducer(state: State, action: Action): SideEffectUpdate<State, Action> {
    switch (action.tag) {
        case 'UpdateAPIKey':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    apiKey: action.apiKey
                }
            }
        case 'UpdateActiveChart':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    activeChart: action.chart
                }
            }
        case 'PromptForNewChart':
            return {
                tag: 'SideEffect',
                sideEffect: (dispatch, state) => {
                    const name = prompt('Enter new chart name:')?.trim()
                    if (name === undefined || name.length === 0) {
                        return
                    }
                    if (state.charts.some(chart => chart.name === name)) {
                        dispatch({ tag: 'ShowChartNameTakenMessage' })
                        return
                    }
                    dispatch({ tag: 'AddNewChart', name })
                }
            }
        case 'ShowChartNameTakenMessage':
            return {
                tag: 'SideEffect',
                sideEffect: () =>
                    alert('A chart with that name already exists')
            }
        case 'AddNewChart': {
            const chart = createChart(action.name)
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [ ...state.charts, chart ],
                    activeChart: chart
                }
            }
        }
        case 'PromptToRenameActiveChart':
            return {
                tag: 'SideEffect',
                sideEffect: (dispatch, state) => {
                    const name = prompt('Enter new chart name:')?.trim()
                    if (name === undefined || name.length === 0) {
                        return
                    }
                    if (state.charts.some(chart => chart !== state.activeChart && chart.name === name)) {
                        dispatch({ tag: 'ShowChartNameTakenMessage' })
                        return
                    }
                    dispatch({ tag: 'RenameActiveChart', name })
                }
            }
        case 'RenameActiveChart': {
            const activeIndex = state.charts.indexOf(state.activeChart)
            const chart = {
                ...state.activeChart,
                name: action.name
            }
            const [ before, after ] = splitArrayAtIndex(state.charts, activeIndex)
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [ ...before, chart, ...after ],
                    activeChart: chart
                }
            }
        }
        case 'PromptToDeleteActiveChart':
            return {
                tag: 'SideEffect',
                sideEffect: dispatch => {
                    if (confirm('Really delete active chart? This cannot be undone')) {
                        dispatch({ tag: 'DeleteActiveChart' })
                    }
                }
            }
        case 'DeleteActiveChart': {
            let activeChart: Chart
            let charts: Chart[]
            if (state.charts.length === 1) {
                activeChart = createChart()
                charts = [ activeChart ]
            }
            else {
                const activeIndex = state.charts.indexOf(state.activeChart)
                activeChart = activeIndex === 0
                    ? state.charts[1]
                    : state.charts[activeIndex - 1]
                charts = splitArrayAtIndex(state.charts, activeIndex).flat()
            }
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts,
                    activeChart
                }
            }
        }
        case 'PromptToSelectImportJSON':
            return {
                tag: 'SideEffect',
                sideEffect: dispatch => {
                    const input = document.createElement('input')
                    input.style.display = 'none'
                    input.setAttribute('type', 'file')
                    input.accept = 'application/json'

                    input.addEventListener('change', async () => {
                        const file = input.files?.[0]
                        try {
                            if (file === undefined) {
                                return
                            }
                            const json = await readInputFileText(file)
                            const state: State = JSON.parse(json)
                            dispatch({ tag: 'UpdateAllState', state })
                        }
                        catch {
                            dispatch({ tag: 'ShowInvalidImportJSONMessage' })
                        }
                    })

                    // The input change event is never fired if the user closes
                    // the dialog. This has no associated event, so there is no
                    // reliable way to know when it happens.
                    // However, the dialog opening causes the body to lose
                    // focus, and upon closing the body gains focus again.
                    // Listening for the body regaining focus like this is the
                    // only reliable way to clean up the input element.
                    // Also, this doesn't work with addEventListener for some
                    // reason.
                    document.body.onfocus = () => input.remove()

                    // Doesn't seem to work on Firefox (???)
                    input.click()
                }
            }
        case 'ShowInvalidImportJSONMessage':
            return {
                tag: 'SideEffect',
                sideEffect: () =>
                    alert('Selected file is invalid')
            }
        case 'UpdateAllState':
            return {
                tag: 'Update',
                state: action.state
            }
        case 'PromptToExportState':
            return {
                tag: 'SideEffect',
                sideEffect: (_dispatch, state) => {
                    const link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = 'data:application/json;charset=utf-8,'
                        + encodeURIComponent(JSON.stringify(state))
                    link.download = 'state.json'
                    link.click()
                    // Can safely just remove straight away this time
                    link.remove()
                }
            }
        case 'CancelSearchRequest': {
            if (state.search.tag !== 'Loading') {
                return { tag: 'NoUpdate' }
            }
            const controller = state.search.controller
            return {
                tag: 'UpdateWithSideEffect',
                state: {
                    ...state,
                    search: {
                        tag: 'Waiting',
                        query: state.search.query
                    }
                },
                sideEffect: () => controller.abort()
            }
        }
        case 'SendSearchRequest': {
            if (state.search.tag === 'Loading'
                    || state.search.query.trim().length === 0) {
                return { tag: 'NoUpdate' }
            }

            if (state.apiKey.length === 0) {
                return {
                    tag: 'Update',
                    state: {
                        ...state,
                        search: {
                            tag: 'Error',
                            query: state.search.query,
                            message: 'Last.fm API key required'
                        }
                    }
                }
            }

            const controller = new AbortController()
            return {
                tag: 'UpdateWithSideEffect',
                state: {
                    ...state,
                    search: {
                        tag: 'Loading',
                        query: state.search.query,
                        controller
                    }
                },
                sideEffect: async (dispatch, state) => {
                    const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${state.search.query.trim()}&api_key=${state.apiKey}&format=json`

                    let response: Response
                    try {
                        response = await fetch(url, {
                            signal: controller.signal
                        })
                    }
                    catch {
                        dispatch({
                            tag: 'UpdateSearchState',
                            state: {
                                tag: 'Error',
                                query: state.search.query,
                                message: 'Network error sending request to Last.fm'
                            }
                        })
                        return
                    }
                    if (!response.ok) {
                        dispatch({
                            tag: 'UpdateSearchState',
                            state: {
                                tag: 'Error',
                                query: state.search.query,
                                message: `Last.fm request returned ${response.status}`
                            }
                        })
                        return
                    }

                    let result: SearchResult
                    try {
                        result = await response.json()
                    }
                    catch {
                        dispatch({
                            tag: 'UpdateSearchState',
                            state: {
                                tag: 'Error',
                                query: state.search.query,
                                message: 'Invalid data returned from Last.fm'
                            }
                        })
                        return
                    }

                    dispatch({
                        tag: 'UpdateSearchState',
                        state: {
                            tag: 'Complete',
                            query: state.search.query,
                            albums: formatSearchResult(result)
                        }
                    })
                }
            }
        }
        case 'UpdateSearchState':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    search: action.state
                }
            }
        case 'UpdateSearchQuery': {
            if (state.search.tag === 'Loading') {
                return { tag: 'NoUpdate' }
            }
            return {
                tag: 'Update',
                state: {
                    ...state,
                    search: {
                        ...state.search,
                        query: action.query
                    }
                }
            }
        }
    }
}
