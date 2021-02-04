import type { FC, RefObject } from 'react'

import type { DispatchProps } from '@/reducer'
import type { Chart, ScreenshotState } from '@/types'
import { ViewerSidebar } from '@/components/ViewerSidebar'
import { ViewerChart } from '@/components/ViewerChart'


export type ViewerProps =
    & DispatchProps
    & {
        chartRef: RefObject<HTMLElement>
        chart: Chart
        screenshotState: ScreenshotState
        highlighted: number | undefined
    }


export const Viewer: FC<ViewerProps> = ({
    dispatch,
    chartRef,
    chart,
    screenshotState,
    highlighted
}) =>
    <>
        <ViewerSidebar dispatch={dispatch}
            chartRef={chartRef}
            screenshotState={screenshotState}/>
        <ViewerChart {...chart}
            dispatch={dispatch}
            innerRef={chartRef}
            highlighted={highlighted}/>
    </>
