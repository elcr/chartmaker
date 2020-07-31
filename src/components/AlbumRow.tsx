import React, { FC, ComponentType } from 'react'
import { css } from 'emotion'

import { Album, Size } from '@/types'
import { DispatchProps } from '@/reducer'
import ChartAlbumCover, { ChartAlbumCoverProps } from '@/components/ChartAlbumCover'


export type AlbumRowProps = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
> & {
    albums: Album[]
    size: Size
    albumCoverComponent?: ComponentType<ChartAlbumCoverProps>
}


const style = css({
    display: 'flex'
})


const AlbumRow: FC<AlbumRowProps> = ({
    dispatch,
    albums,
    size,
    albumCoverComponent: AlbumCoverComponent = ChartAlbumCover
}) => {
    const albumCovers = albums.map(album =>
        <AlbumCoverComponent key={album.id}
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
