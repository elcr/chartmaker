import type { FC } from 'react'
import { css } from 'emotion'

import type { Album } from '@/types'
import type { DispatchProps } from '@/reducer'
import { ChartAlbumCover } from '@/components/ChartAlbumCover'
import { getAlbumID } from '@/state'


export type AlbumRowProps = DispatchProps & {
    albums: Album[]
    size: string
    highlighted: number | undefined
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FC<AlbumRowProps> = ({
    dispatch,
    albums,
    size,
    highlighted
}) => {
    const albumCovers = albums.map(album => {
        const id = getAlbumID(album)
        return (
            <ChartAlbumCover key={id}
                dispatch={dispatch}
                album={album}
                highlighted={highlighted === undefined
                    ? undefined
                    : id === highlighted}
                size={size}/>
        )
    })
    return (
        <div className={style}>
            {albumCovers}
        </div>
    )
}
