import { CHART_ALBUMS_COUNT, DEFAULT_CHART_NAME } from './constants'


export type Album =
    | {
        placeholder: true
        id: number
    }
    | {
        placeholder: false
        id: number
        name: string
        url: string
    }


export type Chart = {
    name: string
    albums: Album[]
}


export type SearchState =
    | { tag: 'Waiting', query: string }
    | { tag: 'Loading', query: string, controller: AbortController }
    | { tag: 'Complete', query: string, albums: Album[] }
    | { tag: 'Error', query: string, message: string }


export type State = {
    apiKey: string
    charts: Chart[]
    activeChartIndex: number
    search: SearchState
    albumIDCounter: number
}


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
            albums
        }
    ]
}


export function createInitialState(): State {
    const [ albumIDCounter, chart ] = createChart()
    return {
        apiKey: '',
        charts: [ chart ],
        activeChartIndex: 0,
        search: { tag: 'Waiting', query: '' },
        albumIDCounter
    }
}


export function escapeState(state: State): State {
    return {
        ...state,
        search: state.search.tag === 'Complete' || state.search.tag === 'Waiting'
            ? state.search
            : { tag: 'Waiting', query: state.search.query }
    }
}
