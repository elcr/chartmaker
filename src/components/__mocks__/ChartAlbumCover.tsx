import type { FC } from 'react'

import type { ChartAlbumCoverProps } from '@/components/ChartAlbumCover'


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = ({ album, size, highlighted }) => {
    const json = JSON.stringify(album)
    return (
        <div className='mock-chart-album-cover'>
            {`Album: ${json}`}
            {`Size: ${size}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
