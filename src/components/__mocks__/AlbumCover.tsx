import React, { FC } from 'react'
import { cx } from 'emotion'

import { AlbumCoverProps } from '@/components/AlbumCover'


export const AlbumCover: FC<AlbumCoverProps> = ({
    album,
    size,
    overlayClass,
    children,
    ...props
}) => {
    const json = JSON.stringify(album)
    const className = cx('test-album-cover', overlayClass)
    return (
        <div {...props} className={className}>
            {`Album: ${json}`}
            {`Size: ${size}`}
            {children}
        </div>
    )
}