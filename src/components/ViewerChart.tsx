import { forwardRef, PropsWithChildren } from 'react'

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
        highlighted: number | null
    }


export const ViewerChart = forwardRef<HTMLElement, PropsWithChildren<ViewerChartProps>>(
    ({ dispatch, albums, highlighted, name, shape, size }, ref) => {
        const [ rows, groups ] = splitAlbumsAccordingToShape(
            albums,
            shape,
            size
        )

        return (
            <Chart ref={ref} name={name}>
                <ViewerAlbumRows dispatch={dispatch}
                    rows={rows}
                    highlighted={highlighted}/>
                <ViewerAlbumTitles dispatch={dispatch}
                    groups={groups}
                    highlighted={highlighted}/>
            </Chart>
        )
    }
)
