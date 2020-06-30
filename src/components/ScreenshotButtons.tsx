import { h, FunctionComponent } from 'preact'
import { Ref } from 'preact/hooks'

import { ControlledSlider } from './ControlledSlider'
import { DispatchProps } from '../reducer'
import { SidebarGroup } from './SidebarGroup'
import { Button } from './Button'
import { ScreenshotState } from '../types'
import { MAX_SCREENSHOT_SCALE } from '../constants'


type Props = DispatchProps<'UpdateScreenshotScale' | 'TakeScreenshot'> & {
    screenshotState: ScreenshotState
    chartRef: Ref<HTMLElement>
}


export const ScreenshotButtons: FunctionComponent<Props> = ({
    dispatch,
    screenshotState: { loading, scale },
    chartRef
}) => {
    function updateScreenshotScale(scale: number) {
        dispatch({ tag: 'UpdateScreenshotScale', scale })
    }

    function takeScreenshot() {
        dispatch({
            tag: 'TakeScreenshot',
            element: chartRef.current
        })
    }

    return (
        <SidebarGroup>
            <ControlledSlider id='screenshotScale'
                    disabled={loading}
                    value={scale}
                    onChange={updateScreenshotScale}
                    min={1}
                    max={MAX_SCREENSHOT_SCALE}
                    step={1}>
                Scale
            </ControlledSlider>
            <Button onClick={takeScreenshot} disabled={loading}>
                Screenshot
            </Button>
        </SidebarGroup>
    )
}
