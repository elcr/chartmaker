import type { FC } from 'react'
import { css } from 'emotion'

import { ALBUM_BUTTONS_PADDING_SIZE } from '@/style'
import { AlbumCover, AlbumCoverProps } from '@/components/AlbumCover'
import type { Album } from '@/types'
import type { DispatchProps } from '@/reducer'
import { getAlbumID, identifiedAlbumIsPlaceholder } from '@/state'


const overlayStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: ALBUM_BUTTONS_PADDING_SIZE
})


export type ChartAlbumCoverProps =
    & DispatchProps
    & Omit<AlbumCoverProps, 'overlayClass' | 'album' | 'onMouseEnter'>
    & {
        album: Album
    }


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = ({ dispatch, album, ...props }) => {
    function mouseEnter() {
        dispatch({
            tag: 'HighlightAlbum',
            targetID: getAlbumID(album)
        })
    }

    return (
        <AlbumCover {...props}
            album={identifiedAlbumIsPlaceholder(album) ? null : album}
            overlayClass={overlayStyle}
            onMouseEnter={mouseEnter}/>
    )
}
