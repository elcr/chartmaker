import { Chart, State, Album } from './types'
import {
    DEFAULT_CHART_NAME,
    CHART_ALBUMS_COUNT,
    DEFAULT_COLLAGE_ROWS_X,
    DEFAULT_COLLAGE_ROWS_Y
} from './constants'


type CreateChartArguments = {
    albumIDCounter?: number
    name?: string
}


export function createChart({
    albumIDCounter = 0,
    name = DEFAULT_CHART_NAME
}: CreateChartArguments = {}): [ number, Chart ] {
    const albums: Album[] = []
    for (let id = albumIDCounter + 1; id < albumIDCounter + CHART_ALBUMS_COUNT + 1; id++) {
        albums.push({ placeholder: true, id })
    }
    return [
        albumIDCounter + CHART_ALBUMS_COUNT,
        {
            name,
            albums,
            shape: { tag: 'Top', size: 40 },
            rowsX: DEFAULT_COLLAGE_ROWS_X,
            rowsY: DEFAULT_COLLAGE_ROWS_Y
        }
    ]
}


export function createInitialState(): State {
    const [ albumIDCounter, chart ] = createChart()
    return {
        apiKey: '',
        charts: [ chart ],
        activeChartIndex: 0,
        search: {
            tag: 'Waiting',
            query: ''
        },
        albumIDCounter,
        screenshot: {
            loading: false,
            scale: 1
        }
    }
}


export function escapeStateForExport(state: State): State {
    return {
        ...state,
        search: {
            tag: 'Waiting',
            query: state.search.query
        },
        screenshot: {
            loading: false,
            scale: state.screenshot.scale
        }
    }
}
