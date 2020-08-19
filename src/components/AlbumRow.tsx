import React, { FC } from 'react'
import { css } from 'emotion'

import { Album, Size } from '@/types'
import { DispatchProps } from '@/reducer'
import { ChartAlbumCover } from '@/components/ChartAlbumCover'


export type AlbumRowProps = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
    | 'DropExternalFile'
> & {
    albums: Album[]
    size: Size
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FC<AlbumRowProps> = ({
    dispatch,
    albums,
    size
}) => {
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
