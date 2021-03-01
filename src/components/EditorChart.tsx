import { forwardRef, PropsWithChildren } from 'react'

import type { Chart as ChartState } from '@/types'
import type { DispatchProps } from '@/reducer'
import { Chart } from '@/components/Chart'
import { splitAlbumsAccordingToShape } from '@/utils'
import { EditorAlbumRows } from '@/components/EditorAlbumRows'
import { EditorAlbumTitles } from '@/components/EditorAlbumTitles'


export type EditorChartProps =
    & DispatchProps
    & ChartState
    & {
        highlighted: number | null
    }


export const EditorChart = forwardRef<HTMLElement, PropsWithChildren<EditorChartProps>>(
    ({ dispatch, albums, highlighted, name, shape, size }, ref) => {
        const [ rows, groups ] = splitAlbumsAccordingToShape(
            albums,
            shape,
            size
        )

        return (
            <Chart ref={ref} name={name}>
                <EditorAlbumRows dispatch={dispatch}
                    rows={rows}
                    highlighted={highlighted}/>
                <EditorAlbumTitles dispatch={dispatch}
                    groups={groups}
                    highlighted={highlighted}/>
            </Chart>
        )
    }
)
