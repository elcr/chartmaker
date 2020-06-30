import { h, FunctionComponent } from 'preact'

import { NamedAlbum } from '../state'
import { AlbumCover } from './AlbumCover'


type Props = {
    album: NamedAlbum
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
