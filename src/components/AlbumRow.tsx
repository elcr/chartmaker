import React, { FC } from 'react'
import { css } from 'emotion'

import { Album } from '../state'
import { AlbumCover } from './AlbumCover'
import { DispatchProps } from '../reducer'


type Props = DispatchProps<'BeginDraggingAlbum' | 'DragChartAlbum' | 'DropChartAlbum'> & {
    albums: Album[]
    sizeRem: number
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FC<Props> = ({ dispatch, albums, sizeRem }) => {
    function drop() {
        dispatch({ tag: 'DropChartAlbum' })
    }

    const albumCovers = albums.map(album => {
        function drag() {
            dispatch({
                tag: 'DragChartAlbum',
                targetID: album.id
            })
        }

        return (
            <AlbumCover key={album.id}
                dispatch={dispatch}
                details={album}
                sizeRem={sizeRem}
                onDragEnter={drag}
                onDragEnd={drop}/>
        )
    })
    return (
        <div className={style}>
            {albumCovers}
        </div>
    )
}
