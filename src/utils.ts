import html2canvas from 'html2canvas'
import { fromUint8Array as base64FromUint8Array } from 'js-base64'

import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent
} from 'lz-string'

import {
    DEFAULT_CHART_NAME,
    CHART_ALBUMS_COUNT,
    LOCAL_STORAGE_KEY,
    DEFAULT_CHART_SHAPE,
    DEFAULT_CHART_SIZE
} from '@/constants'
import {
    LARGE_ALBUM_SIZE,
    MEDIUM_ALBUM_SIZE,
    SMALL_ALBUM_SIZE,
    TINY_ALBUM_SIZE,
    VERY_LARGE_ALBUM_SIZE,
    VERY_SMALL_ALBUM_SIZE
} from '@/style'
import { BACKGROUND_COLOUR } from '@/style'
import {
    Chart,
    State,
    V1State as V1ExportState,
    V2State as V2ExportState,
    ExportState as V3ExportState,
    Album,
    NamedAlbum,
    UnidentifiedAlbum,
    ViewerChart,
    CollageSize,
    TopSize,
    Route
} from '@/types'


export async function elementToDataURI(element: HTMLElement, scale: number): Promise<string> {
    const canvas = await html2canvas(element, {
        allowTaint: true,
        scale,
        useCORS: true,
        imageTimeout: 0,
        backgroundColor: BACKGROUND_COLOUR
    })
    return canvas.toDataURL()
}


export function jsonToDataURI(json: string): string {
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(json)
}


export async function fileToDataURI(file: File): Promise<string> {
    const buffer = await file.arrayBuffer()
    const array = new Uint8Array(buffer)
    const base64 = base64FromUint8Array(array)
    return `data:${file.type};base64,${base64}`
}


export function downloadURI(uri: string, filename: string): void {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    link.click()
    link.remove()
}


export function createChart(name = DEFAULT_CHART_NAME): Chart {
    return {
        name,
        albums: [ ...Array(CHART_ALBUMS_COUNT).keys() ],
        shape: DEFAULT_CHART_SHAPE,
        size: DEFAULT_CHART_SIZE
    }
}


export function createInitialState(): State {
    return {
        apiKey: '',
        charts: [ createChart() ],
        activeChartIndex: 0,
        searchState: {
            tag: 'Waiting',
            query: ''
        },
        screenshotState: {
            loading: false,
            scale: 1
        },
        route: null,
        highlightedID: null
    }
}


export function validateUnknownState(state: unknown): State | null {
    if (V3ExportState.guard(state)) {
        return createStateFromV3ExportState(state)
    }
    if (V2ExportState.guard(state)) {
        return createStateFromV2ExportState(state)
    }
    if (V1ExportState.guard(state)) {
        return createStateFromV1ExportState(state)
    }
    return null
}


function decodeExportAlbums(exportAlbums: UnidentifiedAlbum[]): Album[] {
    const albums: Album[] = []
    for (let index = 0; index < CHART_ALBUMS_COUNT; index++) {
        const album = exportAlbums[index]
        albums.push(
            album === undefined || unidentifiedAlbumIsPlaceholder(album)
                ? index
                : {
                    id: index,
                    name: album.name,
                    url: album.url
                }
        )
    }
    return albums
}


function encodeExportAlbums(albums: Album[]): UnidentifiedAlbum[] {
    const exportAlbums: UnidentifiedAlbum[] = []
    let sliceIndex: number | undefined
    for (let index = 0; index < albums.length; index++) {
        const album = albums[index]!
        if (identifiedAlbumIsPlaceholder(album)) {
            exportAlbums.push(null)
            sliceIndex ??= index
        }
        else {
            exportAlbums.push({
                name: album.name,
                url: album.url
            })
            sliceIndex = undefined
        }
    }
    return sliceIndex === undefined
        ? exportAlbums
        : exportAlbums.slice(0, sliceIndex)
}


function createStateFromV1ExportState(state: V1ExportState): State {
    return {
        activeChartIndex: state.activeChartIndex,
        apiKey: state.apiKey,
        screenshotState: state.screenshot,
        searchState: state.search,
        charts: state.charts.map(chart => ({
            name: chart.name,
            shape: [ chart.rowsX, chart.rowsY ],
            size: chart.shape.tag === 'Collage'
                ? null
                : chart.shape.size,
            albums: chart.albums.map((album, index) =>
                album.placeholder
                    ? index
                    : {
                        id: index,
                        name: album.name,
                        url: album.url
                    }
            )
        })),
        highlightedID: null,
        route: null
    }
}


function createStateFromV2ExportState(state: V2ExportState): State {
    return {
        activeChartIndex: state.activeChartIndex,
        apiKey: state.apiKey,
        screenshotState: state.screenshot,
        searchState: state.search,
        charts: state.charts.map(chart => ({
            name: chart.name,
            shape: [ chart.rowsX, chart.rowsY ],
            size: chart.shape.tag === 'Collage'
                ? null
                : chart.shape.size,
            albums: chart.albums.map((album, index) =>
                identifiedAlbumIsPlaceholder(album)
                    ? index
                    : {
                        id: index,
                        name: album.name,
                        url: album.url
                    }
            )
        })),
        highlightedID: null,
        route: null
    }
}


function createStateFromV3ExportState(state: V3ExportState): State {
    return {
        activeChartIndex: state.activeChartIndex,
        apiKey: state.apiKey,
        screenshotState: {
            loading: false,
            scale: 1
        },
        searchState: {
            tag: 'Waiting',
            query: state.search
        },
        charts: state.charts.map(chart => ({
            name: chart.name,
            shape: chart.shape,
            size: chart.size,
            albums: decodeExportAlbums(chart.albums)
        })),
        highlightedID: null,
        route: null
    }
}


export function createExportState(state: State): V3ExportState {
    return {
        version: 3,
        activeChartIndex: state.activeChartIndex,
        apiKey: state.apiKey,
        search: state.searchState.query,
        charts: state.charts.map(chart => ({
            name: chart.name,
            size: chart.size,
            shape: chart.shape,
            albums: encodeExportAlbums(chart.albums)
        }))
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
    return validateUnknownState(state)
}


export function saveStateToLocalStorage(state: State) {
    const escaped = createExportState(state)
    const json = JSON.stringify(escaped)
    localStorage.setItem(LOCAL_STORAGE_KEY, json)
}


export function identifiedAlbumIsPlaceholder(album: Album): album is number {
    return typeof album === 'number'
}


function identifiedAlbumIsNamed(album: Album): album is NamedAlbum {
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


function encodeViewerChart(chart: Chart): string {
    const viewerChart: ViewerChart = {
        name: chart.name,
        size: chart.size ?? chart.shape,
        albums: encodeExportAlbums(chart.albums)
    }
    const json = JSON.stringify(viewerChart)
    return compressToEncodedURIComponent(json)
}


function decodeViewerChart(encoded: string): Chart | null {
    let json: string | null | undefined
    try {
        json = decompressFromEncodedURIComponent(encoded)
    }
    catch {
        return null
    }
    if (json === null || json === undefined) {
        return null
    }

    let chart: unknown
    try {
        chart = JSON.parse(json)
    }
    catch {
        return null
    }
    if (!ViewerChart.guard(chart)) {
        return null
    }

    return {
        name: chart.name,
        shape: typeof chart.size === 'number'
            ? DEFAULT_CHART_SHAPE
            : chart.size,
        size: typeof chart.size === 'number'
            ? chart.size
            : null,
        albums: decodeExportAlbums(chart.albums)
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
    [ rowsX, rowsY ]: CollageSize
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
    shape: CollageSize,
    size: TopSize | null
): [ AlbumRow[], NamedAlbum[][] ] {
    if (size === null) {
        return collageGroups(albums, shape)
    }

    let rows: AlbumRow[]
    switch (size) {
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


export function routeToHash(route: Route): string {
    switch (route.tag) {
        case 'Editor':
            return ''
        case 'Viewer': {
            if (route.chart === null) {
                return ''
            }
            const encoded = encodeViewerChart(route.chart)
            return `#${encoded}`
        }
    }
}


export function routeFromHash(hash: string): Route {
    return hash.length === 0
        ? { tag: 'Editor' }
        : {
            tag: 'Viewer',
            chart: decodeViewerChart(location.hash.slice(1))
        }
}
