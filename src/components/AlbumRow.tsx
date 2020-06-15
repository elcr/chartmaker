import React, { FC } from 'react'
import { css } from 'emotion'

import { Album } from '../state'
import { DispatchProps } from '../reducer'
import { ChartAlbumCover } from './ChartAlbumCover'


type Props = DispatchProps<'DragChartAlbum' | 'DropSearchAlbum'> & {
    albums: Album[]
    sizeRem: number
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FC<Props> = ({ dispatch, albums, sizeRem }) => {
    const albumCovers = albums.map(album =>
        <ChartAlbumCover key={album.id}
            dispatch={dispatch}
            album={album}
            sizeRem={sizeRem}/>
    )
    return (
        <div className={style}>
            {albumCovers}
        </div>
    )
}
