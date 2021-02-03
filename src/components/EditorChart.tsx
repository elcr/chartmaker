import type { FC, Ref } from 'react'

import type { Chart as ChartDetails, Album, NamedAlbum } from '@/types'
import type { DispatchProps } from '@/reducer'
import { Chart } from '@/components/Chart'
import { identifiedAlbumIsPlaceholder, splitAlbumsAccordingToShape } from '@/state'
import { EditorAlbumRowsContainer } from '@/components/EditorAlbumRowsContainer'
import { EditorAlbumTitlesContainer } from '@/components/EditorAlbumTitlesContainer'


function isNamedAlbum(album: Album): album is NamedAlbum {
    return !identifiedAlbumIsPlaceholder(album)
}


export type EditorChartProps =
    & DispatchProps
    & ChartDetails
    & {
        innerRef: Ref<HTMLElement>
        highlighted: number | undefined
    }


export const EditorChart: FC<EditorChartProps> = ({
    dispatch,
    albums,
    highlighted,
    innerRef,
    name,
    rowsX,
    rowsY,
    shape
}) => {
    const [ rows, groups ] = splitAlbumsAccordingToShape(
        albums,
        isNamedAlbum,
        shape,
        rowsX,
        rowsY
    )

    return (
        <Chart innerRef={innerRef} name={name}>
            <EditorAlbumRowsContainer dispatch={dispatch}
                rows={rows}
                highlighted={highlighted}/>
            <EditorAlbumTitlesContainer dispatch={dispatch}
                groups={groups}
                highlighted={highlighted}/>
        </Chart>
    )
}
