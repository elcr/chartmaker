import React, { FC } from 'react'
import { css } from 'emotion'

import { Album } from '../state'
import { SidebarGroup } from './SidebarGroup'
import { LARGE_ROW_SIZE_REM } from '../constants'
import { SearchAlbumCover } from './SearchAlbumCover'


type Props = {
    albums: Album[]
}


const style = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
})


export const SearchResults: FC<Props> = ({ albums }) => {
    const albumCovers = albums.map(album =>
        <SearchAlbumCover key={album.id}
            album={album}
            sizeRem={LARGE_ROW_SIZE_REM}/>
    )

    return (
        <SidebarGroup>
            <div className={style}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
