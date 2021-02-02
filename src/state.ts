import { Album, Chart, State, V1State, V2State, ExportChart } from '@/types'
import {
    DEFAULT_CHART_NAME,
    CHART_ALBUMS_COUNT,
    DEFAULT_COLLAGE_ROWS_X,
    DEFAULT_COLLAGE_ROWS_Y,
    DEFAULT_CHART_SHAPE,
    LOCAL_STORAGE_KEY,
    STATE_VERSION,
    EXPORT_CHART_PLACEHOLDER
} from '@/constants'


export function createChart(name = DEFAULT_CHART_NAME): Chart {
    return {
        name,
        albums: [ ...Array(CHART_ALBUMS_COUNT).keys() ],
        shape: DEFAULT_CHART_SHAPE,
        rowsX: DEFAULT_COLLAGE_ROWS_X,
        rowsY: DEFAULT_COLLAGE_ROWS_Y
    }
}


export function createInitialState(): State {
    return {
        version: STATE_VERSION,
        apiKey: '',
        charts: [ createChart() ],
        activeChartIndex: 0,
        search: {
            tag: 'Waiting',
            query: ''
        },
        screenshot: {
            loading: false,
            scale: 1
        }
    }
}


export function validateState(state: unknown): State | null {
    if (State.guard(state)) {
        return state
    }
    if (V2State.guard(state)) {
        return v2StateToCurrentState(state)
    }
    if (V1State.guard(state)) {
        return v1StateToCurrentState(state)
    }
    return null
}


export function loadStateFromLocalStorage(): State | null {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value === null) {
        return null
    }
    let state: unknown
    try {
        state = JSON.parse(value)
    }
    catch {
        return null
    }
    return validateState(state)
}


function v1StateToCurrentState(state: V1State): State {
    // all fields specified manually rather than using spread to strip unused
    // legacy fields
    return {
        version: STATE_VERSION,
        activeChartIndex: state.activeChartIndex,
        apiKey: state.apiKey,
        screenshot: state.screenshot,
        highlightedID: state.highlightedID,
        search: state.search,
        charts: state.charts.map(chart => ({
            ...chart,
            albums: chart.albums.map((album, index) =>
                album.placeholder
                    ? index
                    : {
                        id: index,
                        name: album.name,
                        url: album.url
                    }
            )
        }))
    }
}


function v2StateToCurrentState(state: V2State): State {
    // v2 -> v3 has no legacy fields so spread ok
    return {
        ...state,
        version: STATE_VERSION
    }
}


export function escapeStateForSave(state: State): State {
    return {
        version: state.version,
        activeChartIndex: state.activeChartIndex,
        apiKey: state.apiKey,
        charts: state.charts,
        screenshot: {
            loading: false,
            scale: state.screenshot.scale
        },
        search: {
            tag: 'Waiting',
            query: state.search.query
        },
        highlightedID: undefined,
        viewing: undefined
    }
}


export function saveStateToLocalStorage(state: State) {
    const escaped = escapeStateForSave(state)
    const json = JSON.stringify(escaped)
    localStorage.setItem(LOCAL_STORAGE_KEY, json)
}


export function isPlaceholderAlbum(album: Album): album is number {
    return typeof album === 'number'
}


export function getAlbumID(album: Album): number {
    return isPlaceholderAlbum(album) ? album : album.id
}


export function findAlbumIndexWithID(albums: ReadonlyArray<Album>, id: number): number | null {
    const index = albums.findIndex(album => getAlbumID(album) === id)
    return index === -1
        ? null
        : index
}


export function createExportChart(state: State): ExportChart {
    const chart = state.charts[state.activeChartIndex]!
    return {
        name: chart.name,
        shape: chart.shape.tag === 'Top'
            ? chart.shape
            : {
                tag: 'Collage',
                rowsX: chart.rowsX,
                rowsY: chart.rowsY
            },
        albums: chart.albums.map(album =>
            isPlaceholderAlbum(album)
                ? EXPORT_CHART_PLACEHOLDER
                : {
                    name: album.name,
                    url: album.url
                }
        )
    }
}
