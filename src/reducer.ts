import {
    Dispatch as Dispatch_,
    update,
    sideEffect,
    noUpdate,
    updateWithSideEffect,
    SideEffectReducer
} from 'react-use-side-effect-reducer'
import { produce } from 'immer'

import { createChart, escapeStateForExport, } from '@/state'
import {
    findIndex,
    elementToDataURI,
    downloadURI,
    jsonToDataURI,
    fileToDataURI
} from '@/utils'
import { search } from '@/api'
import {
    State,
    SearchState,
    ChartShape,
    NamedAlbum
} from '@/types'
import {
    MAX_SCREENSHOT_SCALE,
    MAX_COLLAGE_ROWS_X,
    MAX_COLLAGE_ROWS_Y
} from '@/constants'


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
    | { tag: 'MoveActiveChart', direction: 'Up' | 'Down' }
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
    | { tag: 'DropExternalFile', file: File, targetID: number }
    | { tag: 'LoadExternalFile', uri: string, name: string, targetID: number }
    | { tag: 'HighlightAlbum', targetID: number }
    | { tag: 'UnhighlightAlbum' }


export type Dispatch = Dispatch_<Action>
export type DispatchProps = {
    dispatch: Dispatch
}


export const reducer: SideEffectReducer<State, Action> = (state, action) => {
    switch (action.tag) {
        case 'UpdateAPIKey':
            return update(
                produce(state, state => {
                    state.apiKey = action.apiKey
                })
            )

        case 'UpdateActiveChart':
            return update(
                produce(state, state => {
                    state.activeChartIndex = action.index
                    state.highlightedID = undefined
                })
            )

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
            return update(
                produce(state, state => {
                    state.charts.push(chart)
                    state.albumIDCounter = albumIDCounter
                    state.activeChartIndex = state.charts.length - 1
                    state.highlightedID = undefined
                })
            )
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
                        if (index !== state.activeChartIndex) {
                            dispatch({ tag: 'ShowChartNameTakenMessage' })
                        }
                        return
                    }
                }
                dispatch({ tag: 'RenameActiveChart', name })
            })

        case 'RenameActiveChart':
            return update(
                produce(state, state => {
                    state.charts[state.activeChartIndex].name = action.name
                })
            )

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
                return update(
                    produce(state, state => {
                        state.charts = [ chart ]
                        state.activeChartIndex = 0
                        state.albumIDCounter = albumIDCounter
                        state.highlightedID = undefined
                    })
                )
            }

            return update(
                produce(state, state => {
                    state.charts.splice(state.activeChartIndex, 1)
                    state.activeChartIndex = state.activeChartIndex - 1 < 0
                        ? state.charts.length - 1
                        : state.activeChartIndex - 1
                    state.highlightedID = undefined
                })
            )
        }

        case 'MoveActiveChart': {
            if (state.charts.length === 1) {
                return noUpdate
            }

            if (action.direction === 'Up') {
                if (state.activeChartIndex === 0) {
                    return noUpdate
                }
                return update(
                    produce(state, state => {
                        const temp = state.charts[state.activeChartIndex - 1]
                        state.charts[state.activeChartIndex - 1] = state.charts[state.activeChartIndex]
                        state.charts[state.activeChartIndex] = temp
                        state.activeChartIndex--
                    })
                )
            }

            if (state.activeChartIndex === state.charts.length - 1) {
                return noUpdate
            }

            return update(
                produce(state, state => {
                    const temp = state.charts[state.activeChartIndex + 1]
                    state.charts[state.activeChartIndex + 1] = state.charts[state.activeChartIndex]
                    state.charts[state.activeChartIndex] = temp
                    state.activeChartIndex++
                })
            )
        }

        case 'ImportStateFile':
            return sideEffect(async dispatch => {
                try {
                    const json = await action.file.text()
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
                return noUpdate
            }
            const controller = state.search.controller
            return updateWithSideEffect<State, Action>(
                produce(state, state => {
                    state.search = {
                        tag: 'Waiting',
                        query: state.search.query
                    }
                }),
                () => controller.abort()
            )
        }

        case 'SendSearchRequest': {
            if (state.search.tag === 'Loading'
                    || state.search.query.trim().length === 0) {
                return noUpdate
            }

            if (state.apiKey.trim().length === 0) {
                return update(
                    produce(state, state => {
                        state.search = {
                            tag: 'Error',
                            query: state.search.query,
                            message: 'Last.fm API key required'
                        }
                    })
                )
            }

            const controller = new AbortController()
            return updateWithSideEffect<State, Action>(
                produce(state, state => {
                    state.search = {
                        tag: 'Loading',
                        query: state.search.query,
                        controller
                    }
                }),
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
                                state: produce(state, state => {
                                    state.search = {
                                        tag: 'Complete',
                                        query: state.search.query,
                                        albums
                                    }
                                    state.albumIDCounter += result.albums.length
                                })
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
            return update(
                produce(state, state => {
                    state.search = action.state
                })
            )

        case 'UpdateSearchQuery': {
            if (state.search.tag === 'Loading') {
                return noUpdate
            }
            return update(
                produce(state, state => {
                    state.search.query = action.query
                })
            )
        }

        case 'DragChartAlbum': {
            if (action.sourceID === action.targetID) {
                return noUpdate
            }

            const activeChart = state.charts[state.activeChartIndex]

            const sourceIndex = findIndex(activeChart.albums, album => album.id === action.sourceID)
            if (sourceIndex === null) {
                return noUpdate
            }

            const targetIndex = findIndex(activeChart.albums, album => album.id === action.targetID)
            if (targetIndex === null) {
                return noUpdate
            }

            return update(
                produce(state, state => {
                    const albums = state.charts[state.activeChartIndex].albums
                    const source = { ...albums[sourceIndex] }
                    if (sourceIndex < targetIndex) {
                        for (let index = sourceIndex; index < targetIndex; index++) {
                            albums[index] = albums[index + 1]
                        }
                    }
                    else {
                        for (let index = sourceIndex; index > targetIndex; index--) {
                            albums[index] = albums[index - 1]
                        }
                    }
                    albums[targetIndex] = source
                })
            )
        }

        case 'DropSearchAlbum': {
            if (state.search.tag !== 'Complete') {
                return noUpdate
            }

            const source = state.search.albums.find(album => album.id === action.sourceID)
            if (source === undefined) {
                return noUpdate
            }

            const targetIndex = findIndex(
                state.charts[state.activeChartIndex].albums,
                album => album.id === action.targetID
            )
            if (targetIndex === null) {
                return noUpdate
            }

            return update(
                produce(state, state => {
                    const chart = state.charts[state.activeChartIndex]
                    chart.albums[targetIndex] = produce(source, album => {
                        album.id = state.albumIDCounter + 1
                    })
                    state.albumIDCounter++
                })
            )
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
            const chart = state.charts[state.activeChartIndex]

            const index = findIndex(chart.albums, album => album.id === action.id)
            if (index === null) {
                return noUpdate
            }

            const album = chart.albums[index]
            if (album.placeholder) {
                return noUpdate
            }

            return update(
                produce(state, state => {
                    const chart = state.charts[state.activeChartIndex]
                    chart.albums[index] = produce(album, album => {
                        album.name = action.name
                    })
                })
            )
        }

        case 'DeleteAlbum': {
            const index = findIndex(
                state.charts[state.activeChartIndex].albums,
                album => album.id === action.id
            )
            if (index === null) {
                return noUpdate
            }
            return update(
                produce(state, state => {
                    state.charts[state.activeChartIndex].albums[index] = {
                        placeholder: true,
                        id: action.id
                    }
                })
            )
        }

        case 'UpdateScreenshotLoading':
            return update(
                produce(state, state => {
                    state.screenshot.loading = action.loading
                })
            )

        case 'UpdateScreenshotScale': {
            if (state.screenshot.loading
                    || action.scale < 1
                    || action.scale > MAX_SCREENSHOT_SCALE) {
                return noUpdate
            }
            return update(
                produce(state, state => {
                    state.screenshot.scale = action.scale
                })
            )
        }

        case 'TakeScreenshot': {
            if (state.screenshot.loading) {
                return noUpdate
            }
            return updateWithSideEffect<State, Action>(
                produce(state, state => {
                    state.screenshot.loading = true
                }),
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

        case 'UpdateChartShape': {
            if (action.rowsX < 1
                    || action.rowsX > MAX_COLLAGE_ROWS_X
                    || action.rowsY < 1
                    || action.rowsY > MAX_COLLAGE_ROWS_Y) {
                return noUpdate
            }
            return update(
                produce(state, state => {
                    const chart = state.charts[state.activeChartIndex]
                    chart.shape = action.shape
                    chart.rowsX = action.rowsX
                    chart.rowsY = action.rowsY
                })
            )
        }

        case 'DropExternalFile': {
            const exists = state.charts[state.activeChartIndex].albums.some(album =>
                album.id === action.targetID
            )
            if (!exists) {
                return noUpdate
            }

            return sideEffect(async dispatch =>
                dispatch({
                    tag: 'LoadExternalFile',
                    targetID: action.targetID,
                    uri: await fileToDataURI(action.file),
                    name: action.file.name
                })
            )
        }

        case 'LoadExternalFile': {
            const targetIndex = findIndex(
                state.charts[state.activeChartIndex].albums,
                album => album.id === action.targetID
            )
            if (targetIndex === null) {
                return noUpdate
            }

            return update(
                produce(state, state => {
                    state.charts[state.activeChartIndex].albums[targetIndex] = {
                        placeholder: false,
                        id: action.targetID,
                        name: action.name,
                        url: action.uri
                    }
                })
            )
        }

        case 'HighlightAlbum': {
            const target = state.charts[state.activeChartIndex].albums.find(album =>
                !album.placeholder && album.id === action.targetID
            )
            if (target === undefined) {
                return update(
                    produce(state, state => {
                        state.highlightedID = undefined
                    })
                )
            }

            return update(
                produce(state, state => {
                    state.highlightedID = action.targetID
                })
            )
        }

        case 'UnhighlightAlbum':
            return update(
                produce(state, state => {
                    state.highlightedID = undefined
                })
            )
    }
}
