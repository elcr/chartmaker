import type { FC } from 'react'
import { cx } from 'emotion'

import type { AlbumCoverProps } from '@/components/AlbumCover'


export const AlbumCover: FC<AlbumCoverProps> = ({
    album,
    size,
    overlayClass,
    children,
    highlighted,
    ...props
}) => {
    const json = JSON.stringify(album)
    const className = cx('mock-album-cover', overlayClass)
    return (
        <div {...props} className={className}>
            {`Album: ${json}`}
            {`Size: ${size}`}
            {`Highlighted: ${highlighted}`}
            {children}
        </div>
    )
}
