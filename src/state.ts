import { CHART_ALBUMS_COUNT } from './constants'


export type Album = {
    title: string
    imageURL: string
}


export type Chart = {
    name: string
    albums: (Album | null)[]
}


export type State = {
    apiKey: string
    charts: Chart[]
    activeChart: Chart
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
        activeChart: chart
    }
}
