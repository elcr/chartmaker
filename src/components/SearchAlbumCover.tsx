import { h, FunctionComponent } from 'preact'

import { Album } from '../state'
import { AlbumCover } from './AlbumCover'


type Props = {
    album: Album
    size: string
}


export const SearchAlbumCover: FunctionComponent<Props> = ({ album, size }) => {
    function dragStart(event: DragEvent) {
        event.dataTransfer!.setData(`search-${album.id}`, '')
        event.dataTransfer!.effectAllowed = 'copy'
    }

    return (
        <AlbumCover album={album}
            size={size}
            onDragStart={dragStart}/>
    )
}
