import {
    Record as Record_,
    Literal,
    String,
    Union,
    InstanceOf,
    Boolean,
    Static,
    Number as Number_,
    Array as Array_,
    Runtype,
    Partial as Partial_
} from 'runtypes'

import {
    CHART_ALBUMS_COUNT,
    MAX_SCREENSHOT_SCALE,
    MAX_COLLAGE_ROWS_X,
    MAX_COLLAGE_ROWS_Y
} from '@/constants'


export const Integer = Number_.withConstraint(Number.isSafeInteger)


export function IntegerRange(minimum: number, maximum = Number.MAX_SAFE_INTEGER) {
    return Integer.withConstraint(number => number >= minimum && number <= maximum)
}


export function FixedSizeArray<T extends Runtype>(element: T, size: number) {
    return Array_(element).withConstraint(array => array.length === size)
}


export function NonEmptyArray<T extends Runtype>(element: T) {
    return Array_(element).withConstraint(array => array.length > 0)
}


export const NonEmptyString = String.withConstraint(string => string.length !== 0)


export const PlaceholderAlbum = Record_({
    placeholder: Literal(true),
    id: IntegerRange(1)
})


export const SearchAlbum = Record_({
    name: NonEmptyString,
    url: NonEmptyString
})


export const NamedAlbum = SearchAlbum.And(
    Record_({
        placeholder: Literal(false),
        id: IntegerRange(1)
    })
)


const Album = Union(PlaceholderAlbum, NamedAlbum)


const ChartShape = Union(
    Record_({
        tag: Literal('Top'),
        size: Union(
            Literal(40),
            Literal(42),
            Literal(100)
        )
    }),
    Record_({
        tag: Literal('Collage')
    })
)


const Chart = Record_({
    name: NonEmptyString,
    albums: FixedSizeArray(Album, CHART_ALBUMS_COUNT),
    shape: ChartShape,
    rowsX: IntegerRange(1, MAX_COLLAGE_ROWS_X),
    rowsY: IntegerRange(1, MAX_COLLAGE_ROWS_Y)
})


const SearchState = Union(
    Record_({
        tag: Literal('Waiting')
    }),
    Record_({
        tag: Literal('Loading'),
        controller: InstanceOf(AbortController)
    }),
    Record_({
        tag: Literal('Complete'),
        albums: NonEmptyArray(SearchAlbum)
    }),
    Record_({
        tag: Literal('Error'),
        message: String
    })
).And(
    Record_({
        query: String
    })
)


const ScreenshotState = Record_({
    loading: Boolean,
    scale: IntegerRange(1, MAX_SCREENSHOT_SCALE)
})


export const State = Record_({
    apiKey: String,
    charts: NonEmptyArray(Chart),
    activeChartIndex: IntegerRange(0),
    search: SearchState,
    screenshot: ScreenshotState
}).And(
    Partial_({
        highlightedID: IntegerRange(1)
    })
)


export type NamedAlbum = Static<typeof NamedAlbum>
export type SearchAlbum = Static<typeof SearchAlbum>
export type PlaceholderAlbum = Static<typeof PlaceholderAlbum>
export type Album = Static<typeof Album>
export type ChartShape = Static<typeof ChartShape>
export type Chart = Static<typeof Chart>
export type SearchState = Static<typeof SearchState>
export type ScreenshotState = Static<typeof ScreenshotState>
export type State = Static<typeof State>
