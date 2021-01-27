import React, { FC } from 'react'

import { SearchAlbumCoverProps } from '@/components/SearchAlbumCover'


export const SearchAlbumCover: FC<SearchAlbumCoverProps> = ({ album }) => {
    const json = JSON.stringify(album)
    return (
        <div className='mock-search-album-cover'>
            {`Album: ${json}`}
        </div>
    )
}
