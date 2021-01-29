import type { FC } from 'react'
import { css } from 'emotion'

import type { NamedAlbum } from '@/types'
import { SidebarGroup } from '@/components/SidebarGroup'
import { SearchAlbumCover } from '@/components/SearchAlbumCover'


export type SearchResultsProps = {
    albums: NamedAlbum[]
}


const containerStyle = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
})


const groupStyle = css({
    overflowY: 'scroll'
})


export const SearchResults: FC<SearchResultsProps> = ({ albums }) => {
    const albumCovers = albums.map(album =>
        <SearchAlbumCover key={album.id} album={album}/>
    )

    return (
        <SidebarGroup className={groupStyle}>
            <div className={containerStyle}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
