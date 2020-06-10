import { CHART_ALBUMS_COUNT } from './constants'


export type Album = {
    artist: string
    title: string
    image: {
        smallURL: string
        largeURL: string
    }
}


export function formatAlbumTitle(album: Pick<Album, 'artist' | 'title'>) {
    return `${album.artist} - ${album.title}`
}


export type Chart = {
    name: string
    albums: (Album | null)[]
}


export type SearchState =
    | { tag: 'Waiting', query: string }
    | { tag: 'Loading', query: string, controller: AbortController }
    | { tag: 'Complete', query: string, albums: Album[] }
    | { tag: 'Error', query: string, message: string }


export type State = {
    apiKey: string
    charts: Chart[]
    activeChart: Chart
    search: SearchState
}


export function createChart(name = 'Untitled chart'): Chart {
    return {
        name,
        albums: Array(CHART_ALBUMS_COUNT).fill(null)
    }
}


export function createInitialState(): State {
    const chart = createChart()
    return {
        apiKey: '',
        charts: [ chart ],
        activeChart: chart,
        search: { tag: 'Waiting', query: '' }
    }
}
