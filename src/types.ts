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
    Runtype
} from 'runtypes'
import {
    CHART_ALBUMS_COUNT,
    MAX_SCREENSHOT_SCALE,
    MAX_COLLAGE_ROWS_X,
    MAX_COLLAGE_ROWS_Y
} from './constants'


export const Integer = Number_.withConstraint(Number.isSafeInteger)


export function IntegerRange(minimum: number, maximum: number) {
    return Integer.withConstraint(number => number >= minimum && number <= maximum)
}


export function FixedSizeArray<T extends Runtype>(element: T, size: number) {
    return Array_(element).withConstraint(array => array.length === size)
}


export function NonEmptyArray<T extends Runtype>(element: T) {
    return Array_(element).withConstraint(array => array.length > 0)
}


const PlaceholderAlbum = Record_({
    placeholder: Literal(true),
    id: Integer
})


export const NamedAlbum = Record_({
    placeholder: Literal(false),
    id: Integer,
    name: String,
    url: String
})
export type NamedAlbum = Static<typeof NamedAlbum>


const Album = Union(PlaceholderAlbum, NamedAlbum)
export type Album = Static<typeof Album>


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
export type ChartShape = Static<typeof ChartShape>


const Chart = Record_({
    name: String,
    albums: FixedSizeArray(Album, CHART_ALBUMS_COUNT),
    shape: ChartShape,
    rowsX: IntegerRange(1, MAX_COLLAGE_ROWS_X),
    rowsY: IntegerRange(1, MAX_COLLAGE_ROWS_Y)
})
export type Chart = Static<typeof Chart>


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
        albums: NonEmptyArray(NamedAlbum)
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
export type SearchState = Static<typeof SearchState>


const ScreenshotState = Record_({
    loading: Boolean,
    scale: IntegerRange(1, MAX_SCREENSHOT_SCALE)
})
export type ScreenshotState = Static<typeof ScreenshotState>


export const State = Record_({
    apiKey: String,
    charts: NonEmptyArray(Chart),
    activeChartIndex: Integer,
    search: SearchState,
    albumIDCounter: Integer,
    screenshot: ScreenshotState
})
export type State = Static<typeof State>


type Branded<TBase, TBrand extends string> = TBase & {
    __brand: TBrand
}


export type Colour = Branded<string, 'Colour'>
export type Border = Branded<string, 'Border'>
export type Size = Branded<string, 'Size'>
