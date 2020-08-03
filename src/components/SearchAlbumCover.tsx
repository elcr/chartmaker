import React, { FC, DragEvent } from 'react'

import { NamedAlbum, Size } from '@/types'
import { AlbumCover } from '@/components/AlbumCover'


export type SearchAlbumCoverProps = {
    album: NamedAlbum
    size: Size
}


export const SearchAlbumCover: FC<SearchAlbumCoverProps> = ({ album, size }) => {
    function dragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData(`search-${album.id}`, '')
        event.dataTransfer.effectAllowed = 'copy'
    }

    return (
        <AlbumCover album={album}
            size={size}
            onDragStart={dragStart}/>
    )
}
