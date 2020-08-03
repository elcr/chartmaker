import React, { FC } from 'react'

import { AlbumRowProps } from '@/components/AlbumRow'


export const AlbumRow: FC<AlbumRowProps> = ({ albums, size }) => {
    const json = JSON.stringify(albums)
    return (
        <div className='test-album-row'>
            {`Albums: ${json}`}
            {`Size: ${size}`}
        </div>
    )
}
