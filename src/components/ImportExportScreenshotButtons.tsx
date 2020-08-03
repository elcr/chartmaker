import React, { FC, RefObject } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '@/reducer'
import { ScreenshotState } from '@/types'
import { MAX_SCREENSHOT_SCALE } from '@/constants'
import { ControlledSlider } from '@/components/ControlledSlider'
import { SidebarGroup } from '@/components/SidebarGroup'
import { Button } from '@/components/Button'
import { ImportStateButton } from '@/components/ImportStateButton'
import { ExportStateButton } from '@/components/ExportStateButton'


export const sliderID = 'screenshotScale'
export const buttonID = 'screenshot'


export type ImportExportScreenshotButtonsProps = DispatchProps<
    | 'UpdateScreenshotScale'
    | 'TakeScreenshot'
    | 'ImportStateFile'
    | 'PromptToExportState'
> & {
    screenshotState: ScreenshotState
    chartRef: RefObject<HTMLElement>
}


const stateButtonsContainerStyle = css({
    display: 'flex'
})


const buttonContainerStyle = css({
    display: 'flex',
    justifyContent: 'space-between'
})


export const ImportExportScreenshotButtons: FC<ImportExportScreenshotButtonsProps> = ({
    dispatch,
    screenshotState: { loading, scale },
    chartRef
}) => {
    function updateScreenshotScale(scale: number) {
        dispatch({ tag: 'UpdateScreenshotScale', scale })
    }

    function takeScreenshot() {
        if (chartRef.current == null) {
            return
        }
        dispatch({
            tag: 'TakeScreenshot',
            element: chartRef.current
        })
    }

    return (
        <SidebarGroup>
            <ControlledSlider id={sliderID}
                    disabled={loading}
                    value={scale}
                    onChange={updateScreenshotScale}
                    min={1}
                    max={MAX_SCREENSHOT_SCALE}
                    step={1}>
                Scale
            </ControlledSlider>
            <div className={buttonContainerStyle}>
                <Button id={buttonID} onClick={takeScreenshot} disabled={loading}>
                    Screenshot
                </Button>
                <div className={stateButtonsContainerStyle}>
                    <ImportStateButton dispatch={dispatch}/>
                    <ExportStateButton dispatch={dispatch}/>
                </div>
            </div>
        </SidebarGroup>
    )
}
