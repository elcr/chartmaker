import type { FC, RefObject } from 'react'

import type { ScreenshotState } from '@/types'
import { Sidebar } from '@/components/Sidebar'
import { ScreenshotButtons } from '@/components/ScreenshotButtons'
import type { DispatchProps } from '@/reducer'
import { ViewerNavigationButtons } from '@/components/ViewerNavigationButtons'


export type ViewerSidebarProps = DispatchProps & {
    screenshotState: ScreenshotState
    chartRef: RefObject<HTMLElement>
    importDisabled: boolean
}


export const ViewerSidebar: FC<ViewerSidebarProps> = ({
    dispatch,
    chartRef,
    screenshotState,
    importDisabled
}) =>
    <Sidebar>
        <ViewerNavigationButtons dispatch={dispatch}
            importDisabled={importDisabled}/>
        <ScreenshotButtons dispatch={dispatch}
            chartRef={chartRef}
            screenshotState={screenshotState}/>
    </Sidebar>
