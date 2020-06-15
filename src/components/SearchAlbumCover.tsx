import React, { FC, DragEvent } from 'react'

import { Album } from '../state'
import { AlbumCover } from './AlbumCover'


type Props = {
    album: Album
    sizeRem: number
}


export const SearchAlbumCover: FC<Props> = ({ album, sizeRem }) => {
    function dragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData(`search-${album.id}`, '')
        event.dataTransfer.effectAllowed = 'copy'
    }

    return (
        <AlbumCover album={album}
            sizeRem={sizeRem}
            onDragStart={dragStart}/>
    )
}
