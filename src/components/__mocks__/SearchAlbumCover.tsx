import type { FC } from 'react'

import type { SearchAlbumCoverProps } from '@/components/SearchAlbumCover'


export const SearchAlbumCover: FC<SearchAlbumCoverProps> = ({ album }) => {
    const json = JSON.stringify(album)
    return (
        <div className='mock-search-album-cover'>
            {`Album: ${json}`}
        </div>
    )
}
