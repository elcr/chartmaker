import { h, FunctionComponent } from 'preact'

import { Album } from '../state'
import { AlbumCover } from './AlbumCover'


type Props = {
    album: Album
    sizeRem: number
}


export const SearchAlbumCover: FunctionComponent<Props> = ({ album, sizeRem }) => {
    function dragStart(event: DragEvent) {
        event.dataTransfer!.setData(`search-${album.id}`, '')
        event.dataTransfer!.effectAllowed = 'copy'
    }

    return (
        <AlbumCover album={album}
            sizeRem={sizeRem}
            onDragStart={dragStart}/>
    )
}
