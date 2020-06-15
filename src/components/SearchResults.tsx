import React, { FC } from 'react'

import { Album } from '../state'
import { css } from 'emotion'
import { SidebarGroup } from './SidebarGroup'
import { AlbumCover } from './AlbumCover'
import { LARGE_ROW_SIZE_REM } from '../constants'
import { DispatchProps } from '../reducer'


type Props = DispatchProps<'DropSearchAlbum' | 'BeginDraggingAlbum'> & {
    albums: Album[]
}


const style = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
})


export const SearchResults: FC<Props> = ({ dispatch, albums }) => {
    function drop() {
        dispatch({ tag: 'DropSearchAlbum' })
    }

    const albumCovers = albums.map(album =>
        <AlbumCover key={album.id}
            dispatch={dispatch}
            details={album}
            sizeRem={LARGE_ROW_SIZE_REM}
            onDragEnd={drop}/>
    )

    return (
        <SidebarGroup>
            <div className={style}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
