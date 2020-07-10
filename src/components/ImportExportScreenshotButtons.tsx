import { h, FunctionComponent, RefObject } from 'preact'
import { css } from 'emotion'

import { ControlledSlider } from './ControlledSlider'
import { DispatchProps } from '../reducer'
import { SidebarGroup } from './SidebarGroup'
import { Button } from './Button'
import { ScreenshotState } from '../types'
import { MAX_SCREENSHOT_SCALE } from '../constants'
import { ImportStateButton } from './ImportStateButton'
import { ExportStateButton } from './ExportStateButton'


type Props = DispatchProps<
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


export const ImportExportScreenshotButtons: FunctionComponent<Props> = ({
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
            <ControlledSlider id='screenshotScale'
                    disabled={loading}
                    value={scale}
                    onChange={updateScreenshotScale}
                    min={1}
                    max={MAX_SCREENSHOT_SCALE}
                    step={1}>
                Scale
            </ControlledSlider>
            <div class={buttonContainerStyle}>
                <Button onClick={takeScreenshot} disabled={loading}>
                    Screenshot
                </Button>
                <div class={stateButtonsContainerStyle}>
                    <ImportStateButton dispatch={dispatch}/>
                    <ExportStateButton dispatch={dispatch}/>
                </div>
            </div>
        </SidebarGroup>
    )
}
