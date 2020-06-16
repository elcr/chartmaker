import { h, FunctionComponent } from 'preact'
import { Ref } from 'preact/hooks'
import { css } from 'emotion'

import { ControlledSlider } from './ControlledSlider'
import { DispatchProps } from '../reducer'
import { SidebarGroup } from './SidebarGroup'
import { Label } from './Label'
import { Button } from './Button'
import { ScreenshotState } from '../state'
import { MAX_SCREENSHOT_SCALE } from '../constants'


type Props = DispatchProps<'UpdateScreenshotScale' | 'TakeScreenshot'> & {
    screenshotState: ScreenshotState
    chartRef: Ref<HTMLElement>
}


const id = 'screenshotScale'


const containerStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})


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
            <ControlledSlider id={id}
                disabled={loading}
                value={scale}
                onChange={updateScreenshotScale}
                min={1}
                max={MAX_SCREENSHOT_SCALE}
                step={1}/>
            <div class={containerStyle}>
                <Button onClick={takeScreenshot} disabled={loading}>
                    Screenshot
                </Button>
                <Label target={id}>
                    Scale: {scale}
                </Label>
            </div>
        </SidebarGroup>
    )
}
