import { css } from 'emotion'
import type { FC, RefObject } from 'react'

import type { DispatchProps } from '@/reducer'
import type { Chart, ScreenshotState } from '@/types'
import { ViewerSidebar } from '@/components/ViewerSidebar'
import { ViewerChart } from '@/components/ViewerChart'
import { ERROR_TEXT_COLOUR } from '@/style'


const errorStyle = css({
    color: ERROR_TEXT_COLOUR
})


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
        content = (
            <main>
                <h1 className={errorStyle}>
                    Invalid chart URL
                </h1>
            </main>
        )
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
