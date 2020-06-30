import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Album, Size } from '../types'
import { DispatchProps } from '../reducer'
import { ChartAlbumCover } from './ChartAlbumCover'


type Props = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
> & {
    albums: Album[]
    size: Size
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FunctionComponent<Props> = ({ dispatch, albums, size }) => {
    const albumCovers = albums.map(album =>
        <ChartAlbumCover key={album.id}
            dispatch={dispatch}
            album={album}
            size={size}/>
    )
    return (
        <div class={style}>
            {albumCovers}
        </div>
    )
}
