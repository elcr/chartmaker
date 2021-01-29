import type { FC } from 'react'

import type { ChartProps } from '@/components/Chart'


export const Chart: FC<ChartProps> = ({
    albums,
    name,
    rowsX,
    rowsY,
    shape,
    highlighted
}) => {
    const albumsJSON = JSON.stringify(albums, undefined, 2)
    const shapeJSON = JSON.stringify(shape)
    return (
        <div className='mock-chart'>
            {`Albums: ${albumsJSON}`}
            {`Name: ${name}`}
            {`Rows X: ${rowsX}`}
            {`Rows Y: ${rowsY}`}
            {`Shape: ${shapeJSON}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
