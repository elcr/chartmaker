import type { FC, Ref } from 'react'

import type { DispatchProps } from '@/reducer'
import type { Chart as ChartState } from '@/types'
import { splitAlbumsAccordingToShape } from '@/state'
import { Chart } from '@/components/Chart'
import { ViewerAlbumRows } from '@/components/ViewerAlbumRows'
import { ViewerAlbumTitles } from '@/components/ViewerAlbumTitles'


export type ViewerChartProps =
    & DispatchProps
    & ChartState
    & {
        innerRef: Ref<HTMLElement>
        highlighted: number | undefined
    }


export const ViewerChart: FC<ViewerChartProps> = ({
    dispatch,
    albums,
    highlighted,
    innerRef,
    name,
    shape,
    rowsX,
    rowsY
}) => {
    const [ rows, groups ] = splitAlbumsAccordingToShape(
        albums,
        shape,
        rowsX,
        rowsY
    )

    return (
        <Chart innerRef={innerRef} name={name}>
            <ViewerAlbumRows dispatch={dispatch}
                rows={rows}
                highlighted={highlighted}/>
            <ViewerAlbumTitles dispatch={dispatch}
                groups={groups}
                highlighted={highlighted}/>
        </Chart>
    )
}
