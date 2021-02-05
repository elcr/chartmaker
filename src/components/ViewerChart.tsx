import type { FC, Ref } from 'react'

import type { DispatchProps } from '@/reducer'
import type { Chart as ChartState } from '@/types'
import { splitAlbumsAccordingToShape } from '@/utils'
import { Chart } from '@/components/Chart'
import { ViewerAlbumRows } from '@/components/ViewerAlbumRows'
import { ViewerAlbumTitles } from '@/components/ViewerAlbumTitles'


export type ViewerChartProps =
    & DispatchProps
    & ChartState
    & {
        innerRef: Ref<HTMLElement>
        highlighted: number | null
    }


export const ViewerChart: FC<ViewerChartProps> = ({
    dispatch,
    albums,
    highlighted,
    innerRef,
    name,
    shape,
    size
}) => {
    const [ rows, groups ] = splitAlbumsAccordingToShape(
        albums,
        shape,
        size
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
