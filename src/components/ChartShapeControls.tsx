import { h, FunctionComponent, JSX } from 'preact'
import { css } from 'emotion'

import { SidebarGroup } from './SidebarGroup'
import { DispatchProps } from '../reducer'
import { ControlledSlider } from './ControlledSlider'
import { ControlledRadioButton } from './ControlledRadioButton'
import { SIDEBAR_ITEM_PADDING_SIZE } from '../style'
import { MAX_COLLAGE_ROWS_X, MAX_COLLAGE_ROWS_Y } from '../constants'


type Props = DispatchProps<'UpdateChartShape'> & {
    collage: boolean
    rowsX: number
    rowsY: number
}


const buttonsContainerStyle = css({
    display: 'flex'
})


const buttonStyle = css({
    marginRight: SIDEBAR_ITEM_PADDING_SIZE
})


export const ChartShapeControls: FunctionComponent<Props> = ({
    dispatch,
    collage,
    rowsX,
    rowsY
}) => {
    function switchToTop40() {
        dispatch({
            tag: 'UpdateChartShape',
            collage: false,
            rowsX,
            rowsY
        })
    }

    function switchToCollage() {
        dispatch({
            tag: 'UpdateChartShape',
            collage: true,
            rowsX,
            rowsY
        })
    }

    let rowsXSlider: JSX.Element | undefined
    let rowsYSlider: JSX.Element | undefined
    if (collage) {
        const updateRowsX = (rowsX: number) =>
            dispatch({
                tag: 'UpdateChartShape',
                collage: true,
                rowsX,
                rowsY
            })
        const updateRowsY = (rowsY: number) =>
            dispatch({
                tag: 'UpdateChartShape',
                collage: true,
                rowsX,
                rowsY
            })

        rowsXSlider = (
            <ControlledSlider id='rows-x'
                    min={1}
                    max={MAX_COLLAGE_ROWS_X}
                    step={1}
                    value={rowsX}
                    onChange={updateRowsX}>
                X
            </ControlledSlider>
        )
        rowsYSlider = (
            <ControlledSlider id='rows-y'
                    min={1}
                    max={MAX_COLLAGE_ROWS_Y}
                    step={1}
                    value={rowsY}
                    onChange={updateRowsY}>
                Y
            </ControlledSlider>
        )
    }

    return (
        <SidebarGroup>
            <div class={buttonsContainerStyle}>
                <ControlledRadioButton id='top40'
                        class={buttonStyle}
                        checked={!collage}
                        onCheck={switchToTop40}>
                    Top 40
                </ControlledRadioButton>
                <ControlledRadioButton id='collage'
                        checked={collage}
                        onCheck={switchToCollage}>
                    Collage
                </ControlledRadioButton>
            </div>
            {rowsXSlider}
            {rowsYSlider}
        </SidebarGroup>
    )
}
