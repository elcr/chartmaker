import type { FC } from 'react'

import type { AlbumTitleGroupProps } from '@/components/AlbumTitleGroup'


export const AlbumTitleGroup: FC<AlbumTitleGroupProps> = ({ albums, highlighted }) => {
    const json = JSON.stringify(albums)

    return (
        <div className='mock-album-title-group'>
            {`Albums: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
