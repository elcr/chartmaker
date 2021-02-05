import {
    String as String_,
    Number as Number_,
    Array as Array_,
    Record as Record_,
    Runtype,
    Static,
    Union,
    Literal,
    Tuple,
    Null,
    Boolean as Boolean_
} from 'runtypes'

import { CHART_ALBUMS_COUNT } from '@/constants'


function FixedSizeArray<T extends Runtype>(element: T, size: number) {
    return Array_(element).withConstraint(array => array.length === size)
}


function positiveLength(sized: { length: number }): boolean {
    return sized.length > 0
}


function NonEmptyArray<T extends Runtype>(element: T) {
    return Array_(element).withConstraint(positiveLength)
}


const NonEmptyString = String_.withConstraint(positiveLength)

const PositiveInteger = Number_.withConstraint(number =>
    Number.isSafeInteger(number) && number >= 0
)


export const CollageDimension = Union(
    Literal(1),
    Literal(2),
    Literal(3),
    Literal(4),
    Literal(5),
    Literal(6),
    Literal(7),
    Literal(8),
    Literal(9),
    Literal(10)
)
const CollageSize = Tuple(CollageDimension, CollageDimension)
const TopSize = Union(
    Literal(40),
    Literal(42),
    Literal(100)
)


const UnidentifiedNamedAlbum = Record_({
    name: NonEmptyString,
    url: NonEmptyString
})
const UnidentifiedAlbum = UnidentifiedNamedAlbum.Or(Null)
const UnidentifiedAlbumArray = FixedSizeArray(UnidentifiedAlbum, CHART_ALBUMS_COUNT)
const NamedAlbum = UnidentifiedNamedAlbum.And(
    Record_({
        id: PositiveInteger
    })
)
const Album = NamedAlbum.Or(PositiveInteger)


const V1PlaceholderAlbum = Record_({
    placeholder: Literal(true),
    id: PositiveInteger
})
const V1NamedAlbum = UnidentifiedNamedAlbum.And(
    Record_({
        placeholder: Literal(false),
        id: PositiveInteger
    })
)
const V1Album = V1NamedAlbum.Or(V1PlaceholderAlbum)


const V1Chart = Record_({
    name: NonEmptyString,
    rowsX: CollageDimension,
    rowsY: CollageDimension,
    shape: Union(
        Record_({
            tag: Literal('Top'),
            size: TopSize
        }),
        Record_({
            tag: Literal('Collage')
        })
    ),
    albums: FixedSizeArray(V1Album, CHART_ALBUMS_COUNT)
})

const V2Chart = Record_({
    ...V1Chart.fields,
    albums: FixedSizeArray(Album, CHART_ALBUMS_COUNT)
})

const Chart = Record_({
    name: V2Chart.fields.name,
    shape: CollageSize,
    size: TopSize.Or(Null),
    albums: FixedSizeArray(Album, CHART_ALBUMS_COUNT)
})

export const ViewerChart = Record_({
    name: Chart.fields.name,
    albums: UnidentifiedAlbumArray,
    size: CollageSize.Or(TopSize)
})


export const ScreenshotScale = Union(Literal(1), Literal(2), Literal(3))
const ScreenshotState = Record_({
    loading: Boolean_,
    scale: ScreenshotScale
})


export const V1State = Record_({
    apiKey: String_,
    activeChartIndex: PositiveInteger,
    search: Record_({
        tag: Literal('Waiting'),
        query: String_
    }),
    screenshot: ScreenshotState,
    charts: NonEmptyArray(V1Chart)
})

export const V2State = Record_({
    ...V1State.fields,
    version: Literal(2),
    charts: NonEmptyArray(V2Chart)
})

export const ExportState = Record_({
    version: Literal(3),
    activeChartIndex: V2State.fields.activeChartIndex,
    apiKey: V2State.fields.apiKey,
    search: String_,
    charts: NonEmptyArray(
        Record_({
            ...Chart.fields,
            albums: UnidentifiedAlbumArray
        })
    )
})

export type State = {
    apiKey: string
    charts: Chart[]
    activeChartIndex: number
    searchState: SearchState
    screenshotState: ScreenshotState
    routeState: RouteState
    highlightedID: number | null
}


export type SearchState = (
    | { tag: 'Waiting' }
    | { tag: 'Loading', controller: AbortController }
    | { tag: 'Complete', albums: UnidentifiedNamedAlbum[] }
    | { tag: 'Error', message: string }
) & {
    query: string
}

export type Route =
    | { tag: 'Editor' }
    | { tag: 'Viewer', chart: Chart | null }

type RouteState =
    | { loading: true }
    | { loading: false, route: Route | null }


export type UnidentifiedNamedAlbum = Static<typeof UnidentifiedNamedAlbum>
export type ScreenshotState = Static<typeof ScreenshotState>
export type ScreenshotScale = Static<typeof ScreenshotScale>
export type UnidentifiedAlbum = Static<typeof UnidentifiedAlbum>
export type NamedAlbum = Static<typeof NamedAlbum>
export type Album = Static<typeof Album>
export type Chart = Static<typeof Chart>
export type ViewerChart = Static<typeof ViewerChart>
export type V1State = Static<typeof V1State>
export type V2State = Static<typeof V2State>
export type ExportState = Static<typeof ExportState>
export type CollageSize = Static<typeof CollageSize>
export type CollageDimension = Static<typeof CollageDimension>
export type TopSize = Static<typeof TopSize>
