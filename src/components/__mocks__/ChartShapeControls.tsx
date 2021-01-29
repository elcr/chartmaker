import type { FC } from 'react'

import type { ChartShapeControlsProps } from '@/components/ChartShapeControls'


export const ChartShapeControls: FC<ChartShapeControlsProps> = ({
    shape,
    rowsX,
    rowsY
}) => {
    const json = JSON.stringify(shape)
    return (
        <div className='mock-chart-shape-controls'>
            {`Shape: ${json}`}
            {`Rows X: ${rowsX}`}
            {`Rows Y: ${rowsY}`}
        </div>
    )
}
