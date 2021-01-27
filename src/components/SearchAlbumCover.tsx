import React, { FC, DragEvent } from 'react'

import { NamedAlbum } from '@/types'
import { AlbumCover } from '@/components/AlbumCover'
import { SMALL_ALBUM_SIZE } from '@/style'


export type SearchAlbumCoverProps = {
    album: NamedAlbum
}


export const SearchAlbumCover: FC<SearchAlbumCoverProps> = ({ album }) => {
    function dragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData(`search-${album.id}`, '')
        event.dataTransfer.effectAllowed = 'copy'
    }

    return (
        <AlbumCover album={album}
            size={SMALL_ALBUM_SIZE}
            onDragStart={dragStart}/>
    )
}
