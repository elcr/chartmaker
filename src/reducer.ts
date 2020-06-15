import { Dispatch as _Dispatch } from 'react'

import { SideEffectUpdate } from './hooks'
import { State, createChart, SearchState, Album } from './state'
import { readInputFileText, findIndex } from './utils'
import { search } from './api'


type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }
    | { tag: 'UpdateActiveChart', index: number }
    | { tag: 'PromptForNewChart' }
    | { tag: 'ShowChartNameTakenMessage' }
    | { tag: 'AddNewChart', name: string }
    | { tag: 'PromptToRenameActiveChart' }
    | { tag: 'RenameActiveChart', name: string }
    | { tag: 'PromptToDeleteActiveChart' }
    | { tag: 'DeleteActiveChart' }
    | { tag: 'PromptToSelectJSONToImport' }
    | { tag: 'ShowInvalidJSONImportMessage' }
    | { tag: 'LoadState', state: State }
    | { tag: 'PromptToExportStateJSON' }
    | { tag: 'CancelSearchRequest' }
    | { tag: 'SendSearchRequest' }
    | { tag: 'UpdateSearchState', state: SearchState }
    | { tag: 'UpdateSearchQuery', query: string }
    | { tag: 'BeginDraggingAlbum', id: number }
    | { tag: 'DragChartAlbum', targetID: number }
    | { tag: 'DropChartAlbum' }
    | { tag: 'DropSearchAlbum' }


export type ActionTag = Action['tag']
export type Dispatch<T extends ActionTag = ActionTag> = _Dispatch<Extract<Action, { tag: T }>>
export type DispatchProps<T extends ActionTag = ActionTag> = {
    dispatch: Dispatch<T>
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
                    activeChartIndex: action.index,
                    draggedAlbumID: null
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
            const [ albumIDCounter, chart ] = createChart({
                albumIDCounter: state.albumIDCounter,
                name: action.name
            })
            const charts = [ ...state.charts, chart ]
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts,
                    activeChartIndex: charts.length - 1,
                    draggedAlbumID: null,
                    albumIDCounter
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
                    if (state.charts.some((chart, index) => index !== state.activeChartIndex && chart.name === name)) {
                        dispatch({ tag: 'ShowChartNameTakenMessage' })
                        return
                    }
                    dispatch({ tag: 'RenameActiveChart', name })
                }
            }
        case 'RenameActiveChart': {
            const activeChart = state.charts[state.activeChartIndex]
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [
                        ...state.charts.slice(0, state.activeChartIndex),
                        { ...activeChart, name: action.name },
                        ...state.charts.slice(state.activeChartIndex + 1)
                    ]
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
            if (state.charts.length === 1) {
                const [ albumIDCounter, chart ] = createChart({
                    albumIDCounter: state.albumIDCounter
                })
                return {
                    tag: 'Update',
                    state: {
                        ...state,
                        charts: [ chart ],
                        activeChartIndex: 0,
                        albumIDCounter,
                        draggedAlbumID: null
                    }
                }
            }

            const charts = [
                ...state.charts.slice(0, state.activeChartIndex),
                ...state.charts.slice(state.activeChartIndex + 1)
            ]

            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts,
                    activeChartIndex: state.activeChartIndex - 1 < 0
                        ? charts.length - 1
                        : state.activeChartIndex  -1,
                    draggedAlbumID: null
                }
            }
        }
        case 'PromptToSelectJSONToImport':
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
                            dispatch({ tag: 'LoadState', state })
                        }
                        catch {
                            dispatch({ tag: 'ShowInvalidJSONImportMessage' })
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
        case 'ShowInvalidJSONImportMessage':
            return {
                tag: 'SideEffect',
                sideEffect: () =>
                    alert('Selected file is invalid')
            }
        case 'LoadState':
            return {
                tag: 'Update',
                state: action.state
            }
        case 'PromptToExportStateJSON':
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

            if (state.apiKey.trim().length === 0) {
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
                    const result = await search({
                        key: state.apiKey,
                        query: state.search.query,
                        signal: controller.signal
                    })
                    switch (result.tag) {
                        case 'Ok': {
                            const albums = result.albums.map((album, index) => ({
                                ...album,
                                placeholder: false,
                                id: state.albumIDCounter + index + 1
                            }))
                            dispatch({
                                tag: 'LoadState',
                                state: {
                                    ...state,
                                    search: {
                                        tag: 'Complete',
                                        query: state.search.query,
                                        albums
                                    },
                                    albumIDCounter: state.albumIDCounter + result.albums.length
                                }
                            })
                            break
                        }
                        case 'StatusError': {
                            dispatch({
                                tag: 'UpdateSearchState',
                                state: {
                                    tag: 'Error',
                                    query: state.search.query,
                                    message: `Last.fm request returned ${result.status}`
                                }
                            })
                            break
                        }
                        case 'JSONDecodeError': {
                            dispatch({
                                tag: 'UpdateSearchState',
                                state: {
                                    tag: 'Error',
                                    query: state.search.query,
                                    message: 'Invalid data returned from Last.fm'
                                }
                            })
                            break
                        }
                        case 'NetworkError':
                            dispatch({
                                tag: 'UpdateSearchState',
                                state: {
                                    tag: 'Error',
                                    query: state.search.query,
                                    message: 'Network error sending request to Last.fm'
                                }
                            })
                    }
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
        case 'BeginDraggingAlbum':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    draggedAlbumID: action.id
                }
            }
        case 'DragChartAlbum': {
            if (state.draggedAlbumID === null) {
                return { tag: 'NoUpdate' }
            }

            const activeChart = state.charts[state.activeChartIndex]

            const targetIndex = findIndex(activeChart.albums, album => album.id === action.targetID)
            if (targetIndex === null) {
                return { tag: 'NoUpdate' }
            }

            const draggedIndex = findIndex(activeChart.albums, album => album.id === state.draggedAlbumID)
            if (draggedIndex === null) {
                return {
                    tag: 'Update',
                    state: {
                        ...state,
                        searchDragTargetAlbumID: action.targetID
                    }
                }
            }

            let albums: Album[]
            if (draggedIndex < targetIndex) {
                albums = [
                    ...activeChart.albums.slice(0, draggedIndex),
                    ...activeChart.albums.slice(draggedIndex + 1, targetIndex + 1),
                    activeChart.albums[draggedIndex],
                    ...activeChart.albums.slice(targetIndex + 1)
                ]
            }
            else {
                albums = [
                    ...activeChart.albums.slice(0, targetIndex),
                    activeChart.albums[draggedIndex],
                    ...activeChart.albums.slice(targetIndex, draggedIndex),
                    ...activeChart.albums.slice(draggedIndex + 1)
                ]
            }

            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [
                        ...state.charts.slice(0, state.activeChartIndex),
                        { ...activeChart, albums },
                        ...state.charts.slice(state.activeChartIndex + 1)
                    ],
                    searchDragTargetAlbumID: action.targetID
                }
            }
        }
        case 'DropChartAlbum':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    draggedAlbumID: null,
                    searchDragTargetAlbumID: null
                }
            }
        case 'DropSearchAlbum': {
            if (state.search.tag !== 'Complete') {
                return { tag: 'NoUpdate' }
            }

            const activeChart = state.charts[state.activeChartIndex]

            const album = state.search.albums.find(album => album.id === state.draggedAlbumID)
            if (album === undefined) {
                return { tag: 'NoUpdate' }
            }

            const targetIndex = findIndex(activeChart.albums, album => album.id === state.searchDragTargetAlbumID)
            if (targetIndex === null) {
                return { tag: 'NoUpdate' }
            }

            return {
                tag: 'Update',
                state: {
                    ...state,
                    draggedAlbumID: null,
                    charts: [
                        ...state.charts.slice(0, state.activeChartIndex),
                        {
                            ...activeChart,
                            albums: [
                                ...activeChart.albums.slice(0, targetIndex),
                                { ...album, id: state.albumIDCounter + 1 },
                                ...activeChart.albums.slice(targetIndex + 1)
                            ]
                        },
                        ...state.charts.slice(state.activeChartIndex + 1)
                    ],
                    searchDragTargetAlbumID: null,
                    albumIDCounter: state.albumIDCounter + 1
                }
            }
        }
    }
}
