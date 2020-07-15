import React, { FC } from 'react'
import { css } from 'emotion'

import { NamedAlbum } from '../types'
import SidebarGroup from './SidebarGroup'
import SearchAlbumCover from './SearchAlbumCover'
import { LARGE_ALBUM_SIZE } from '../style'


type Props = {
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


const SearchResults: FC<Props> = ({ albums }) => {
    const albumCovers = albums.map(album =>
        <SearchAlbumCover key={album.id}
            album={album}
            size={LARGE_ALBUM_SIZE}/>
    )

    return (
        <SidebarGroup className={groupStyle}>
            <div className={containerStyle}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}


export default SearchResults
