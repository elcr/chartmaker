import type { FC } from 'react'

import type { AlbumRowProps } from '@/components/AlbumRow'


export const AlbumRow: FC<AlbumRowProps> = ({ albums, highlighted, size }) => {
    const json = JSON.stringify(albums)
    return (
        <div className='mock-album-row'>
            {`Albums: ${json}`}
            {`Size: ${size}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
