import type { FC } from 'react'
import { css } from 'emotion'

import { ALBUM_BUTTONS_PADDING_SIZE } from '@/style'
import { AlbumCover, AlbumCoverProps } from '@/components/AlbumCover'


const overlayStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: ALBUM_BUTTONS_PADDING_SIZE
})


export type ChartAlbumCoverProps = Omit<AlbumCoverProps, 'overlayClass'>


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = props =>
    <AlbumCover {...props} overlayClass={overlayStyle}/>
