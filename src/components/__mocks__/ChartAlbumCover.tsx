import React, { FC } from 'react'

import { ChartAlbumCoverProps } from '@/components/ChartAlbumCover'


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = ({ album, size }) => {
    const json = JSON.stringify(album)
    return (
        <div className='mock-chart-album-cover'>
            {`Album: ${json}`}
            {`Size: ${size}`}
        </div>
    )
}
