import React, { FC } from 'react'

import { AlbumTitleGroupProps } from '@/components/AlbumTitleGroup'


export const AlbumTitleGroup: FC<AlbumTitleGroupProps> = ({ albums }) => {
    const json = JSON.stringify(albums)

    return (
        <div className='mock-album-title-group'>
            {`Albums: ${json}`}
        </div>
    )
}
