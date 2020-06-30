import {
    Record,
    Literal,
    String,
    Union,
    InstanceOf,
    Array,
    Boolean,
    Static
} from 'runtypes'

import {
    CHART_ALBUMS_COUNT,
    DEFAULT_CHART_NAME,
    DEFAULT_COLLAGE_ROWS_X,
    DEFAULT_COLLAGE_ROWS_Y,
    MAX_SCREENSHOT_SCALE
} from './constants'
import { Integer, FixedSizeArray, IntegerRange } from './utils'


const PlaceholderAlbum = Record({
    placeholder: Literal(true),
    id: Integer
})


export const NamedAlbum = Record({
    placeholder: Literal(false),
    id: Integer,
    name: String,
    url: String
})
export type NamedAlbum = Static<typeof NamedAlbum>


const Album = Union(PlaceholderAlbum, NamedAlbum)
export type Album = Static<typeof Album>


const ChartShape = Union(
    Record({
        tag: Literal('Top'),
        size: Union(
            Literal(40),
            Literal(42),
            Literal(100)
        )
    }),
    Record({
        tag: Literal('Collage')
    })
)
export type ChartShape = Static<typeof ChartShape>


const Chart = Record({
    name: String,
    albums: FixedSizeArray(Album, CHART_ALBUMS_COUNT),
    shape: ChartShape,
    rowsX: Integer,
    rowsY: Integer
})
export type Chart = Static<typeof Chart>


const SearchState = Union(
    Record({
        tag: Literal('Waiting')
    }),
    Record({
        tag: Literal('Loading'),
        controller: InstanceOf(AbortController)
    }),
    Record({
        tag: Literal('Complete'),
        albums: Array(NamedAlbum)
    }),
    Record({
        tag: Literal('Error'),
        message: String
    })
).And(
    Record({
        query: String
    })
)
export type SearchState = Static<typeof SearchState>


const ScreenshotState = Record({
    loading: Boolean,
    scale: IntegerRange(1, MAX_SCREENSHOT_SCALE)
})
export type ScreenshotState = Static<typeof ScreenshotState>


export const State = Record({
    apiKey: String,
    charts: Array(Chart),
    activeChartIndex: Integer,
    search: SearchState,
    albumIDCounter: Integer,
    screenshot: ScreenshotState
})
export type State = Static<typeof State>


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
