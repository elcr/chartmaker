import type { FC } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { CollageDimension, CollageSize, TopSize } from '@/types'
import { ControlledSlider } from '@/components/ControlledSlider'
import { ControlledRadioButton } from '@/components/ControlledRadioButton'
import { SidebarGroup } from '@/components/SidebarGroup'


export type ChartShapeControlsProps = DispatchProps & {
    shape: CollageSize
    size: TopSize | null
}


const style = css({
    display: 'flex'
})


export const ChartShapeControls: FC<ChartShapeControlsProps> = ({
    dispatch,
    shape: [ rowsX, rowsY ],
    size
}) => {
    function changeShape(shape: CollageSize, size: TopSize | null) {
        dispatch({
            tag: 'UpdateChartShape',
            shape,
            size
        })
    }

    function switchToTop40() {
        changeShape([ rowsX, rowsY ], 40)
    }

    function switchToTop42() {
        changeShape([ rowsX, rowsY ], 42)
    }

    function switchToTop100() {
        changeShape([ rowsX, rowsY ], 100)
    }

    function switchToCollage() {
        changeShape([ rowsX, rowsY ], null)
    }

    let rowsXSlider: JSX.Element | undefined
    let rowsYSlider: JSX.Element | undefined
    if (size === null) {
        const updateRowsX = (rowsX: number) => {
            if (!CollageDimension.guard(rowsX)) {
                return
            }
            dispatch({
                tag: 'UpdateChartShape',
                shape: [ rowsX, rowsY ],
                size
            })
        }
        const updateRowsY = (rowsY: number) => {
            if (!CollageDimension.guard(rowsY)) {
                return
            }
            dispatch({
                tag: 'UpdateChartShape',
                shape: [ rowsX, rowsY ],
                size
            })
        }

        rowsXSlider = (
            <ControlledSlider id='rows-x'
                    min={CollageDimension.alternatives[0].value}
                    max={CollageDimension.alternatives[CollageDimension.alternatives.length - 1]!.value}
                    step={1}
                    value={rowsX}
                    onChange={updateRowsX}>
                X
            </ControlledSlider>
        )
        rowsYSlider = (
            <ControlledSlider id='rows-y'
                    min={CollageDimension.alternatives[0].value}
                    max={CollageDimension.alternatives[CollageDimension.alternatives.length - 1]!.value}
                    step={1}
                    value={rowsY}
                    onChange={updateRowsY}>
                Y
            </ControlledSlider>
        )
    }

    return (
        <SidebarGroup>
            <div className={style}>
                <ControlledRadioButton id='top40'
                        checked={size === 40}
                        onCheck={switchToTop40}>
                    Top 40
                </ControlledRadioButton>
                <ControlledRadioButton id='top42'
                        checked={size === 42}
                        onCheck={switchToTop42}>
                    Top 42
                </ControlledRadioButton>
                <ControlledRadioButton id='top100'
                        checked={size === 100}
                        onCheck={switchToTop100}>
                    Top 100
                </ControlledRadioButton>
                <ControlledRadioButton id='collage'
                        checked={size === null}
                        onCheck={switchToCollage}>
                    Collage
                </ControlledRadioButton>
            </div>
            {rowsXSlider}
            {rowsYSlider}
        </SidebarGroup>
    )
}
