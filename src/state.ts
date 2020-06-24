import { CHART_ALBUMS_COUNT, DEFAULT_CHART_NAME } from './constants'


type PlaceholderAlbum = {
    placeholder: true
    id: number
}


type NamedAlbum = {
    placeholder: false
    id: number
    name: string
    url: string
}


export type Album = PlaceholderAlbum | NamedAlbum


export function albumIsNamed(album: Album): album is NamedAlbum {
    return !album.placeholder
}


export type AlbumRow = {
    albums: Album[]
    size: string
}


export type ChartShape =
    | { tag: 'Top40' }
    | { tag: 'Collage', rowsX: number, rowsY: number }


export type Chart = {
    name: string
    albums: Album[]
    shape: ChartShape
}


export type SearchState = (
    | { tag: 'Waiting' }
    | { tag: 'Loading', controller: AbortController }
    | { tag: 'Complete', albums: Album[] }
    | { tag: 'Error', message: string }
) & {
    query: string
}


export type ScreenshotState = {
    loading: boolean,
    scale: number
}


export type State = {
    apiKey: string
    charts: Chart[]
    activeChartIndex: number
    search: SearchState
    albumIDCounter: number
    screenshot: ScreenshotState
}


type CreateChartArguments = {
    albumIDCounter?: number
    name?: string
    shape?: ChartShape
}


export function createChart({
    albumIDCounter = 0,
    name = DEFAULT_CHART_NAME,
    shape = { tag: 'Top40' }
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
            shape
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


export function escapeState(state: State): State {
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
