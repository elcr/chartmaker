import type { FC, RefObject } from 'react'

import type { DispatchProps } from '@/reducer'
import type { ScreenshotState } from '@/types'
import { MAX_SCREENSHOT_SCALE } from '@/constants'
import { ControlledSlider } from '@/components/ControlledSlider'
import { SidebarGroup } from '@/components/SidebarGroup'
import { Button } from '@/components/Button'


export const sliderID = 'screenshotScale'
export const buttonID = 'screenshot'


export type ScreenshotButtonsProps = DispatchProps & {
    screenshotState: ScreenshotState
    chartRef: RefObject<HTMLElement>
}


export const ScreenshotButtons: FC<ScreenshotButtonsProps> = ({
    dispatch,
    screenshotState: { loading, scale },
    chartRef
}) => {
    function updateScreenshotScale(scale: number) {
        dispatch({ tag: 'UpdateScreenshotScale', scale })
    }

    function takeScreenshot() {
        if (chartRef.current === null) {
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
            <Button id={buttonID} onClick={takeScreenshot} disabled={loading}>
                Screenshot
            </Button>
        </SidebarGroup>
    )
}
