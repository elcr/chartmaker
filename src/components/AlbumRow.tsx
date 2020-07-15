import React, { FC } from 'react'
import { css } from 'emotion'

import { Album, Size } from '../types'
import { DispatchProps } from '../reducer'
import ChartAlbumCover from './ChartAlbumCover'


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


const AlbumRow: FC<Props> = ({ dispatch, albums, size }) => {
    const albumCovers = albums.map(album =>
        <ChartAlbumCover key={album.id}
            dispatch={dispatch}
            album={album}
            size={size}/>
    )
    return (
        <div className={style}>
            {albumCovers}
        </div>
    )
}


export default AlbumRow
