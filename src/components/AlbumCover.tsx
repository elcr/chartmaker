import type { FC, DragEvent } from 'react'
import { css, cx } from 'emotion'

import { TEXT_COLOUR, ALBUM_PADDING_SIZE, highlightBackgroundStyle } from '@/style'
import type { UnidentifiedAlbum } from '@/types'
import { unidentifiedAlbumIsPlaceholder } from '@/state'


export type AlbumCoverProps = {
    album: UnidentifiedAlbum
    size: string
    onDragStart?: (event: DragEvent<HTMLDivElement>) => void
    onDragOver?: (event: DragEvent<HTMLDivElement>) => void
    onDragEnter?: (event: DragEvent<HTMLDivElement>) => void
    onDrop?: (event: DragEvent<HTMLDivElement>) => void
    onMouseEnter?: () => void
    overlayClass?: string
    highlighted?: boolean
}


const baseContainerStyle = css({
    position: 'relative',
    background: TEXT_COLOUR,
    margin: ALBUM_PADDING_SIZE,
    cursor: 'grab'
})

const imageStyle = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    objectFit: 'contain'
})

const baseOverlayStyle = cx(
    imageStyle,
    css({ zIndex: 10 })
)


export const AlbumCover: FC<AlbumCoverProps> = ({
    album,
    size,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDrop,
    onMouseEnter,
    children,
    overlayClass,
    highlighted
}) => {
    const containerStyle = cx(
        baseContainerStyle,
        css({
            width: size,
            height: size,
            ':not(:hover) > div': {
                display: 'none'
            }
        }),
        highlighted === false
            ? highlightBackgroundStyle
            : undefined
    )

    let image: JSX.Element | undefined
    if (!unidentifiedAlbumIsPlaceholder(album)) {
        image = (
            // lazy loading causes problems with html2canvas so keep it default
            <img className={imageStyle}
                src={album.url}
                alt={album.name}
                crossOrigin='anonymous'/>
        )
        children = (
            <div className={cx(baseOverlayStyle, overlayClass)}>
                {children}
            </div>
        )
    }

    return (
        <div className={containerStyle}
                draggable={!unidentifiedAlbumIsPlaceholder(album)}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onMouseEnter={onMouseEnter}
                title={album?.name}>
            {image}
            {children}
        </div>
    )
}
