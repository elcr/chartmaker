import type { FC, RefObject } from 'react'

import type { DispatchProps } from '@/reducer'
import type { Chart, ScreenshotState } from '@/types'
import { ViewerSidebar } from '@/components/ViewerSidebar'
import { ViewerChart } from '@/components/ViewerChart'


export type ViewerProps =
    & DispatchProps
    & {
        chartRef: RefObject<HTMLElement>
        chart: Chart | null
        screenshotState: ScreenshotState
        highlighted: number | null
    }


export const Viewer: FC<ViewerProps> = ({
    dispatch,
    chartRef,
    chart,
    screenshotState,
    highlighted
}) => {
    let content: JSX.Element
    if (chart === null) {
        content = <main>Invalid chart URL</main>
    }
    else {
        content = (
            <ViewerChart {...chart}
                dispatch={dispatch}
                innerRef={chartRef}
                highlighted={highlighted}/>
        )
    }

    return (
        <>
            <ViewerSidebar dispatch={dispatch}
                chartRef={chartRef}
                screenshotState={screenshotState}
                importDisabled={chart === null}/>
            {content}
        </>
    )
}
