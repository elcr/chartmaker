import {
    Album,
    Chart,
    State,
    V1State,
    V2State,
    ViewerChart,
    UnidentifiedAlbum,
    ChartShape,
    NamedAlbum
} from '@/types'
import {
    DEFAULT_CHART_NAME,
    CHART_ALBUMS_COUNT,
    DEFAULT_COLLAGE_ROWS_X,
    DEFAULT_COLLAGE_ROWS_Y,
    DEFAULT_CHART_SHAPE,
    LOCAL_STORAGE_KEY,
    STATE_VERSION
} from '@/constants'
import { LARGE_ALBUM_SIZE, MEDIUM_ALBUM_SIZE, SMALL_ALBUM_SIZE, TINY_ALBUM_SIZE, VERY_LARGE_ALBUM_SIZE, VERY_SMALL_ALBUM_SIZE } from '@/style'


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


export function identifiedAlbumIsPlaceholder(album: Album): album is number {
    return typeof album === 'number'
}


export function identifiedAlbumIsNamed(album: Album): album is NamedAlbum {
    return !identifiedAlbumIsPlaceholder(album)
}


export function unidentifiedAlbumIsPlaceholder(album: UnidentifiedAlbum): album is null {
    return album === null
}


export function getAlbumID(album: Album): number {
    return identifiedAlbumIsPlaceholder(album) ? album : album.id
}


export function findAlbumIndexWithID(albums: ReadonlyArray<Album>, id: number): number | null {
    const index = albums.findIndex(album => getAlbumID(album) === id)
    return index === -1
        ? null
        : index
}


export function createViewerChart(state: State): ViewerChart {
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
            identifiedAlbumIsPlaceholder(album)
                ? null
                : {
                    name: album.name,
                    url: album.url
                }
        )
    }
}


export type AlbumRow = {
    albums: Album[]
    size: string
}


function top40Rows(albums: Album[]): AlbumRow[] {
    return [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(5, 11),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(11, 17),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(17, 24),
            size: MEDIUM_ALBUM_SIZE
        },
        {
            albums: albums.slice(24, 31),
            size: MEDIUM_ALBUM_SIZE
        },
        {
            albums: albums.slice(31, 40),
            size: SMALL_ALBUM_SIZE
        }
    ]
}


function top42Rows(albums: Album[]): AlbumRow[] {
    return [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(5, 10),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(10, 16),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(16, 22),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(22, 32),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(32, 42),
            size: VERY_SMALL_ALBUM_SIZE
        }
    ]
}


function top100Rows(albums: Album[]): AlbumRow[] {
    return [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(5, 10),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(10, 16),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(16, 22),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(22, 28),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(28, 38),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(38, 48),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(48, 58),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(58, 72),
            size: TINY_ALBUM_SIZE
        },
        {
            albums: albums.slice(72, 86),
            size: TINY_ALBUM_SIZE
        },
        {
            albums: albums.slice(86, 100),
            size: TINY_ALBUM_SIZE
        }
    ]
}


function titleGroupsFromRows(rows: AlbumRow[]): NamedAlbum[][] {
    const groups: NamedAlbum[][] = []
    let lastSize = ''

    for (const row of rows) {
        const named = row.albums.filter(identifiedAlbumIsNamed)

        if (row.size === lastSize) {
            for (const album of named) {
                groups[groups.length - 1]!.push(album)
            }
        }
        else {
            groups.push(named)
            lastSize = row.size
        }
    }

    return groups
}


function collageGroups(
    albums: Album[],
    rowsX: number,
    rowsY: number
): [ AlbumRow[], NamedAlbum[][] ] {
    const rows: AlbumRow[] = []
    const groups: NamedAlbum[][] = []

    for (let y = 0; y < rowsY; y++) {
        const slice = albums.slice(rowsX * y, (rowsX * y) + rowsX)
        rows.push({
            albums: slice,
            size: LARGE_ALBUM_SIZE
        })
        groups.push(
            slice.filter(identifiedAlbumIsNamed)
        )
    }

    return [ rows, groups ]
}


export function splitAlbumsAccordingToShape(
    albums: Album[],
    shape: ChartShape,
    rowsX: number,
    rowsY: number
): [ AlbumRow[], NamedAlbum[][] ] {
    if (shape.tag === 'Collage') {
        return collageGroups(albums, rowsX, rowsY)
    }

    let rows: AlbumRow[]
    switch (shape.size) {
        case 40:
            rows = top40Rows(albums)
            break
        case 42:
            rows = top42Rows(albums)
            break
        case 100:
            rows = top100Rows(albums)
    }
    return [ rows, titleGroupsFromRows(rows) ]
}
