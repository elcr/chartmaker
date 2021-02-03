import {
    Record as Record_,
    Literal,
    String as String_,
    Union,
    InstanceOf,
    Boolean,
    Static,
    Number as Number_,
    Array as Array_,
    Runtype,
    Partial as Partial_,
    Null
} from 'runtypes'

import {
    CHART_ALBUMS_COUNT,
    MAX_SCREENSHOT_SCALE,
    MAX_COLLAGE_ROWS_X,
    MAX_COLLAGE_ROWS_Y,
    STATE_VERSION
} from '@/constants'


const Integer = Number_.withConstraint(Number.isSafeInteger)


function IntegerRange(minimum: number, maximum = Number.MAX_SAFE_INTEGER) {
    return Integer.withConstraint(number => number >= minimum && number <= maximum)
}


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


const PositiveInteger = IntegerRange(0)


const V1PlaceholderAlbum = Record_({
    placeholder: Literal(true),
    id: PositiveInteger
})


const UnidentifiedNamedAlbum = Record_({
    name: NonEmptyString,
    url: NonEmptyString
})
export const UnidentifiedAlbum = UnidentifiedNamedAlbum.Or(Null)


const V1NamedAlbum = UnidentifiedNamedAlbum.And(
    Record_({
        placeholder: Literal(false),
        id: PositiveInteger
    })
)
const V2NamedAlbum = UnidentifiedNamedAlbum.And(
    Record_({
        id: PositiveInteger
    })
)
export const NamedAlbum = V2NamedAlbum


const V1Album = V1NamedAlbum.Or(V1PlaceholderAlbum)
const V2Album = V2NamedAlbum.Or(PositiveInteger)
const Album = V2Album


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


const V1Chart = Record_({
    name: NonEmptyString,
    albums: FixedSizeArray(V1Album, CHART_ALBUMS_COUNT),
    shape: ChartShape,
    rowsX: IntegerRange(1, MAX_COLLAGE_ROWS_X),
    rowsY: IntegerRange(1, MAX_COLLAGE_ROWS_Y)
})
const V2Chart = Record_({
    ...V1Chart.fields,
    albums: FixedSizeArray(Album, CHART_ALBUMS_COUNT)
})
const Chart = V2Chart


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
        albums: NonEmptyArray(UnidentifiedNamedAlbum)
    }),
    Record_({
        tag: Literal('Error'),
        message: String_
    })
).And(
    Record_({
        query: String_
    })
)


const ScreenshotState = Record_({
    loading: Boolean,
    scale: IntegerRange(1, MAX_SCREENSHOT_SCALE)
})


const ExportChartShape = ChartShape.alternatives[0].Or(
    ChartShape.alternatives[1].And(
        Record_({
            rowsX: V2Chart.fields.rowsX,
            rowsY: V2Chart.fields.rowsY,
        })
    )
)

const ExportChart = Record_({
    name: V2Chart.fields.name,
    albums: FixedSizeArray(UnidentifiedAlbum, CHART_ALBUMS_COUNT),
    shape: ExportChartShape
})


export const V1State = Record_({
    apiKey: String_,
    charts: NonEmptyArray(V1Chart),
    activeChartIndex: PositiveInteger,
    search: SearchState,
    screenshot: ScreenshotState
}).And(
    Partial_({
        version: Literal(1),
        highlightedID: PositiveInteger
    })
)
export const V2State = Record_({
    ...V1State.intersectees[0].fields,
    version: Literal(2),
    charts: NonEmptyArray(V2Chart)
}).And(
    Partial_({
        highlightedID: PositiveInteger
    })
)
const V3State = Record_({
    ...V2State.intersectees[0].fields,
    version: Literal(STATE_VERSION)
}).And(
    Partial_({
        ...V2State.intersectees[1].fields,
        viewing: ExportChart
    })
)
export const State = V3State


export type NamedAlbum = Static<typeof NamedAlbum>
export type UnidentifiedNamedAlbum = Static<typeof UnidentifiedNamedAlbum>
export type UnidentifiedAlbum = Static<typeof UnidentifiedAlbum>
export type Album = Static<typeof Album>
export type ChartShape = Static<typeof ChartShape>
export type Chart = Static<typeof Chart>
export type SearchState = Static<typeof SearchState>
export type ScreenshotState = Static<typeof ScreenshotState>
export type State = Static<typeof State>
export type V1State = Static<typeof V1State>
export type V2State = Static<typeof V2State>
export type ExportChart = Static<typeof ExportChart>
export type ExportChartShape = Static<typeof ExportChartShape>
