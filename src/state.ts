import { produce } from 'immer'

import { Chart, State, Album } from '@/types'
import {
    DEFAULT_CHART_NAME,
    CHART_ALBUMS_COUNT,
    DEFAULT_COLLAGE_ROWS_X,
    DEFAULT_COLLAGE_ROWS_Y,
    DEFAULT_CHART_SHAPE,
    LOCAL_STORAGE_KEY
} from '@/constants'
import { getRandomIDs } from '@/utils'


export function createChart(name = DEFAULT_CHART_NAME): Chart {
    const ids = getRandomIDs(CHART_ALBUMS_COUNT)
    const albums: Album[] = []
    for (let index = 0; index < CHART_ALBUMS_COUNT - 1; index++) {
        const id = ids[index]!
        albums.push({ placeholder: true, id })
    }
    return {
        name,
        albums,
        shape: DEFAULT_CHART_SHAPE,
        rowsX: DEFAULT_COLLAGE_ROWS_X,
        rowsY: DEFAULT_COLLAGE_ROWS_Y
    }
}


export function createInitialState(): State {
    return {
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
    return State.guard(state)
        ? state
        : null
}


export function escapeStateForExport(state: State): State {
    return produce(state, state => {
        state.search = {
            tag: 'Waiting',
            query: state.search.query
        }
        state.screenshot.loading = false
        state.highlightedID = undefined
    })
}


export function saveStateToLocalStorage(state: State) {
    const escaped = escapeStateForExport(state)
    const json = JSON.stringify(escaped)
    localStorage.setItem(LOCAL_STORAGE_KEY, json)
}
