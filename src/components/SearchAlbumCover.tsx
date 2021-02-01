import type { FC, DragEvent } from 'react'

import type { SearchAlbum } from '@/types'
import { AlbumCover } from '@/components/AlbumCover'
import { SMALL_ALBUM_SIZE } from '@/style'


export type SearchAlbumCoverProps = {
    album: SearchAlbum
    index: number
}


export const SearchAlbumCover: FC<SearchAlbumCoverProps> = ({ album, index }) => {
    function dragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData(`search-${index}`, '')
        event.dataTransfer.effectAllowed = 'copy'
    }

    return (
        <AlbumCover album={album}
            size={SMALL_ALBUM_SIZE}
            onDragStart={dragStart}/>
    )
}
