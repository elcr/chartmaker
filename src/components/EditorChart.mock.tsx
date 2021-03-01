import type { FC } from 'react'

import type { EditorChartProps } from '@/components/EditorChart'


export const EditorChart: FC<EditorChartProps> = ({
    albums,
    highlighted,
    name,
    rowsX,
    rowsY,
    shape
}) => {
    const albumsJSON = JSON.stringify(albums, undefined, 2)
    const shapeJSON = JSON.stringify(shape)
    return (
        <div className='mock-editor-chart'>
            {`Albums: ${albumsJSON}`}
            {`Highlighted: ${highlighted}`}
            {`Name: ${name}`}
            {`Rows X: ${rowsX}`}
            {`Rows Y: ${rowsY}`}
            {`Shape: ${shapeJSON}`}
        </div>
    )
}
