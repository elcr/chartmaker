import type { FC, Ref } from 'react'

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
        innerRef: Ref<HTMLElement>
        highlighted: number | null
    }


export const EditorChart: FC<EditorChartProps> = ({
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
            <EditorAlbumRows dispatch={dispatch}
                rows={rows}
                highlighted={highlighted}/>
            <EditorAlbumTitles dispatch={dispatch}
                groups={groups}
                highlighted={highlighted}/>
        </Chart>
    )
}
