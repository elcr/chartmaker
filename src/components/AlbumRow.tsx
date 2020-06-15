import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Album } from '../state'
import { DispatchProps } from '../reducer'
import { ChartAlbumCover } from './ChartAlbumCover'


type Props = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
> & {
    albums: Album[]
    sizeRem: number
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FunctionComponent<Props> = ({ dispatch, albums, sizeRem }) => {
    const albumCovers = albums.map(album =>
        <ChartAlbumCover key={album.id}
            dispatch={dispatch}
            album={album}
            sizeRem={sizeRem}/>
    )
    return (
        <div class={style}>
            {albumCovers}
        </div>
    )
}
