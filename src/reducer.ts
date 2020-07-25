import {
    Dispatch as Dispatch_,
    update,
    sideEffect,
    noUpdate,
    updateWithSideEffect,
    SideEffectReducer
} from 'react-use-side-effect-reducer'

import { createChart, escapeStateForExport, } from './state'
import {
    readFileText,
    findIndex,
    elementToDataURI,
    downloadURI,
    jsonToDataURI
} from './utils'
import { search } from './api'
import {
    State,
    SearchState,
    ChartShape,
    NamedAlbum,
    Album
} from './types'


export type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }
    | { tag: 'UpdateActiveChart', index: number }
    | { tag: 'PromptForNewChart' }
    | { tag: 'ShowChartNameTakenMessage' }
    | { tag: 'AddNewChart', name: string }
    | { tag: 'PromptToRenameActiveChart' }
    | { tag: 'RenameActiveChart', name: string }
    | { tag: 'PromptToDeleteActiveChart' }
    | { tag: 'DeleteActiveChart' }
    | { tag: 'ImportStateFile', file: File }
    | { tag: 'ShowInvalidStateImportMessage' }
    | { tag: 'LoadState', state: State }
    | { tag: 'PromptToExportState' }
    | { tag: 'CancelSearchRequest' }
    | { tag: 'SendSearchRequest' }
    | { tag: 'UpdateSearchState', state: SearchState }
    | { tag: 'UpdateSearchQuery', query: string }
    | { tag: 'DragChartAlbum', sourceID: number, targetID: number }
    | { tag: 'DropSearchAlbum', sourceID: number, targetID: number }
    | { tag: 'PromptToRenameAlbum', id: number }
    | { tag: 'RenameAlbum', id: number, name: string }
    | { tag: 'DeleteAlbum', id: number }
    | { tag: 'UpdateScreenshotLoading', loading: boolean }
    | { tag: 'UpdateScreenshotScale', scale: number }
    | { tag: 'TakeScreenshot', element: HTMLElement }
    | { tag: 'UpdateChartShape', shape: ChartShape, rowsX: number, rowsY: number }


export type Dispatch<T extends Action['tag'] = Action['tag']> = Dispatch_<Extract<Action, { tag: T }>>
export type DispatchProps<T extends Action['tag'] = Action['tag']> = {
    dispatch: Dispatch<T>
}


export const reducer: SideEffectReducer<State, Action> = (state, action) => {
    switch (action.tag) {
        case 'UpdateAPIKey':
            return update({
                ...state,
                apiKey: action.apiKey
            })

        case 'UpdateActiveChart':
            return update({
                ...state,
                activeChartIndex: action.index
            })

        case 'PromptForNewChart':
            return sideEffect((dispatch, state) => {
                const activeChart = state.charts[state.activeChartIndex]
                const name = prompt('Enter new chart name:', activeChart.name)?.trim()
                if (name === undefined || name.length === 0) {
                    return
                }
                if (state.charts.some(chart => chart.name === name)) {
                    dispatch({ tag: 'ShowChartNameTakenMessage' })
                    return
                }
                dispatch({ tag: 'AddNewChart', name })
            })

        case 'ShowChartNameTakenMessage':
            return sideEffect(() =>
                alert('A chart with that name already exists')
            )

        case 'AddNewChart': {
            const [ albumIDCounter, chart ] = createChart({
                albumIDCounter: state.albumIDCounter,
                name: action.name
            })
            const charts = [ ...state.charts, chart ]
            return update({
                ...state,
                charts,
                activeChartIndex: charts.length - 1,
                albumIDCounter
            })
        }

        case 'PromptToRenameActiveChart':
            return sideEffect((dispatch, state) => {
                const activeChart = state.charts[state.activeChartIndex]
                const name = prompt('Enter new chart name:', activeChart.name)?.trim()
                if (name === undefined || name.length === 0) {
                    return
                }
                for (let index = 0; index < state.charts.length; index++) {
                    const chart = state.charts[index]
                    if (chart.name === name) {
                        if (index === state.activeChartIndex) {
                            return
                        }
                        dispatch({ tag: 'ShowChartNameTakenMessage' })
                    }
                }
                dispatch({ tag: 'RenameActiveChart', name })
            })

        case 'RenameActiveChart': {
            const activeChart = state.charts[state.activeChartIndex]
            return update({
                ...state,
                charts: [
                    ...state.charts.slice(0, state.activeChartIndex),
                    {
                        ...activeChart,
                        name: action.name
                    },
                    ...state.charts.slice(state.activeChartIndex + 1)
                ]
            })
        }

        case 'PromptToDeleteActiveChart':
            return sideEffect(dispatch => {
                if (confirm('Really delete active chart? This cannot be undone')) {
                    dispatch({ tag: 'DeleteActiveChart' })
                }
            })

        case 'DeleteActiveChart': {
            if (state.charts.length === 1) {
                const [ albumIDCounter, chart ] = createChart({
                    albumIDCounter: state.albumIDCounter
                })
                return update({
                    ...state,
                    charts: [ chart ],
                    activeChartIndex: 0,
                    albumIDCounter
                })
            }

            const charts = [
                ...state.charts.slice(0, state.activeChartIndex),
                ...state.charts.slice(state.activeChartIndex + 1)
            ]

            return update({
                ...state,
                charts,
                activeChartIndex: state.activeChartIndex - 1 < 0
                    ? charts.length - 1
                    : state.activeChartIndex  -1
            })
        }

        case 'ImportStateFile':
            return sideEffect(async dispatch => {
                try {
                    const json = await readFileText(action.file)
                    const parsed: unknown = JSON.parse(json)
                    const state = State.check(parsed)
                    dispatch({ tag: 'LoadState', state })
                }
                catch {
                    dispatch({ tag: 'ShowInvalidStateImportMessage' })
                }
            })

        case 'ShowInvalidStateImportMessage':
            return sideEffect(() =>
                alert('Selected file is invalid')
            )

        case 'LoadState':
            return update(action.state)

        case 'PromptToExportState':
            return sideEffect((_dispatch, state) => {
                const json = JSON.stringify(escapeStateForExport(state))
                const uri = jsonToDataURI(json)
                downloadURI(uri, 'state.json')
            })

        case 'CancelSearchRequest': {
            if (state.search.tag !== 'Loading') {
                return noUpdate()
            }
            const controller = state.search.controller
            return updateWithSideEffect<State, Action>(
                {
                    ...state,
                    search: {
                        tag: 'Waiting',
                        query: state.search.query
                    }
                },
                () => controller.abort()
            )
        }

        case 'SendSearchRequest': {
            if (state.search.tag === 'Loading'
                    || state.search.query.trim().length === 0) {
                return noUpdate()
            }

            if (state.apiKey.trim().length === 0) {
                return update<State, Action>({
                    ...state,
                    search: {
                        tag: 'Error',
                        query: state.search.query,
                        message: 'Last.fm API key required'
                    }
                })
            }

            const controller = new AbortController()
            return updateWithSideEffect<State, Action>(
                {
                    ...state,
                    search: {
                        tag: 'Loading',
                        query: state.search.query,
                        controller
                    }
                },
                async (dispatch, state) => {
                    const result = await search({
                        key: state.apiKey,
                        query: state.search.query,
                        signal: controller.signal
                    })
                    switch (result.tag) {
                        case 'Ok': {
                            const albums: NamedAlbum[] = result.albums.map((album, index) => ({
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
                        case 'JSONDecodeError':
                        case 'InvalidResponseData': {
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
                        // 'Cancelled' is not handled because the only time the
                        // request is cancelled is when another is sent, in
                        // which case the search state is updated to 'Loading'
                        // anyway
                    }
                }
            )
        }

        case 'UpdateSearchState':
            return update({
                ...state,
                search: action.state
            })

        case 'UpdateSearchQuery': {
            if (state.search.tag === 'Loading') {
                return noUpdate()
            }
            return update<State, Action>({
                ...state,
                search: {
                    ...state.search,
                    query: action.query
                }
            })
        }

        case 'DragChartAlbum': {
            if (action.sourceID === action.targetID) {
                return noUpdate()
            }

            const activeChart = state.charts[state.activeChartIndex]

            const sourceIndex = findIndex(activeChart.albums, album => album.id === action.sourceID)
            if (sourceIndex === null) {
                return noUpdate()
            }

            const targetIndex = findIndex(activeChart.albums, album => album.id === action.targetID)
            if (targetIndex === null) {
                return noUpdate()
            }

            let albums: Album[]
            if (sourceIndex < targetIndex) {
                albums = [
                    ...activeChart.albums.slice(0, sourceIndex),
                    ...activeChart.albums.slice(sourceIndex + 1, targetIndex + 1),
                    activeChart.albums[sourceIndex],
                    ...activeChart.albums.slice(targetIndex + 1)
                ]
            }
            else {
                albums = [
                    ...activeChart.albums.slice(0, targetIndex),
                    activeChart.albums[sourceIndex],
                    ...activeChart.albums.slice(targetIndex, sourceIndex),
                    ...activeChart.albums.slice(sourceIndex + 1)
                ]
            }

            return update({
                ...state,
                charts: [
                    ...state.charts.slice(0, state.activeChartIndex),
                    {
                        ...activeChart,
                        albums
                    },
                    ...state.charts.slice(state.activeChartIndex + 1)
                ]
            })
        }

        case 'DropSearchAlbum': {
            if (state.search.tag !== 'Complete') {
                return noUpdate()
            }

            const activeChart = state.charts[state.activeChartIndex]

            const source = state.search.albums.find(album => album.id === action.sourceID)
            if (source === undefined) {
                return noUpdate()
            }

            const targetIndex = findIndex(activeChart.albums, album => album.id === action.targetID)
            if (targetIndex === null) {
                return noUpdate()
            }

            return update({
                ...state,
                charts: [
                    ...state.charts.slice(0, state.activeChartIndex),
                    {
                        ...activeChart,
                        albums: [
                            ...activeChart.albums.slice(0, targetIndex),
                            {
                                ...source,
                                id: state.albumIDCounter + 1
                            },
                            ...activeChart.albums.slice(targetIndex + 1)
                        ]
                    },
                    ...state.charts.slice(state.activeChartIndex + 1)
                ],
                albumIDCounter: state.albumIDCounter + 1
            })
        }

        case 'PromptToRenameAlbum':
            return sideEffect((dispatch, state) => {
                const album = state.charts[state.activeChartIndex]
                    .albums
                    .find(album => album.id === action.id)
                if (album === undefined || album.placeholder) {
                    return
                }

                const name = prompt('Enter new album name:', album.name)?.trim()
                if (name === undefined || name.length === 0) {
                    return
                }
                dispatch({
                    tag: 'RenameAlbum',
                    id: action.id,
                    name
                })
            })

        case 'RenameAlbum': {
            const activeChart = state.charts[state.activeChartIndex]

            const index = findIndex(activeChart.albums, album => album.id === action.id)
            if (index === null) {
                return noUpdate()
            }

            const album = activeChart.albums[index]
            if (album.placeholder) {
                return noUpdate()
            }

            return update({
                ...state,
                charts: [
                    ...state.charts.slice(0, state.activeChartIndex),
                    {
                        ...activeChart,
                        albums: [
                            ...activeChart.albums.slice(0, index),
                            {
                                ...album,
                                name: action.name
                            },
                            ...activeChart.albums.slice(index + 1)
                        ]
                    },
                    ...state.charts.slice(state.activeChartIndex + 1)
                ]
            })
        }

        case 'DeleteAlbum': {
            const activeChart = state.charts[state.activeChartIndex]

            const index = findIndex(activeChart.albums, album => album.id === action.id)
            if (index === null) {
                return noUpdate()
            }

            return update({
                ...state,
                charts: [
                    ...state.charts.slice(0, state.activeChartIndex),
                    {
                        ...activeChart,
                        albums: [
                            ...activeChart.albums.slice(0, index),
                            {
                                id: action.id,
                                placeholder: true
                            },
                            ...activeChart.albums.slice(index + 1)
                        ]
                    },
                    ...state.charts.slice(state.activeChartIndex + 1)
                ]
            })
        }

        case 'UpdateScreenshotLoading': {
            return update({
                ...state,
                screenshot: {
                    ...state.screenshot,
                    loading: action.loading
                }
            })
        }

        case 'UpdateScreenshotScale': {
            if (state.screenshot.loading) {
                return noUpdate()
            }
            return update({
                ...state,
                screenshot: {
                    ...state.screenshot,
                    scale: action.scale
                }
            })
        }

        case 'TakeScreenshot': {
            if (state.screenshot.loading) {
                return noUpdate()
            }
            return updateWithSideEffect<State, Action>(
                {
                    ...state,
                    screenshot: {
                        ...state.screenshot,
                        loading: true
                    }
                },
                async (dispatch, state) => {
                    const uri = await elementToDataURI(
                        action.element,
                        state.screenshot.scale
                    )
                    downloadURI(uri, 'chart.png')
                    dispatch({
                        tag: 'UpdateScreenshotLoading',
                        loading: false
                    })
                }
            )
        }

        case 'UpdateChartShape':
            return update({
                ...state,
                charts: [
                    ...state.charts.slice(0, state.activeChartIndex),
                    {
                        ...state.charts[state.activeChartIndex],
                        shape: action.shape,
                        rowsX: action.rowsX,
                        rowsY: action.rowsY
                    },
                    ...state.charts.slice(state.activeChartIndex + 1)
                ]
            })
    }
}
