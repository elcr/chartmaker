import type { FC } from 'react'
import { css } from 'emotion'

import { ALBUM_BUTTONS_PADDING_SIZE } from '@/style'
import { AlbumCover, AlbumCoverProps } from '@/components/AlbumCover'
import type { Album } from '@/types'
import type { DispatchProps } from '@/reducer'
import { getAlbumID, identifiedAlbumIsPlaceholder } from '@/utils'


const overlayStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: ALBUM_BUTTONS_PADDING_SIZE
})


export type ChartAlbumCoverProps =
    & DispatchProps
    & Omit<AlbumCoverProps, 'overlayClass' | 'album' | 'onMouseEnter' | 'highlighted'>
    & {
        album: Album
        highlighted: number | null
    }


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = ({
    dispatch,
    album,
    highlighted,
    ...props
}) => {
    const id = getAlbumID(album)

    function mouseEnter() {
        dispatch({
            tag: 'HighlightAlbum',
            targetID: id
        })
    }

    return (
        <AlbumCover {...props}
            highlighted={highlighted === null
                ? undefined
                : id === highlighted}
            album={identifiedAlbumIsPlaceholder(album) ? null : album}
            overlayClass={overlayStyle}
            onMouseEnter={mouseEnter}/>
    )
}
