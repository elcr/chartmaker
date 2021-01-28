import React, { FC, DragEvent } from 'react'
import { css, cx } from 'emotion'

import { TEXT_COLOUR, ALBUM_PADDING_SIZE, highlightBackgroundStyle } from '@/style'
import { Album } from '@/types'


export type AlbumCoverProps = {
    album: Album
    size: string
    onDragStart: (event: DragEvent<HTMLDivElement>) => void
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
    margin: ALBUM_PADDING_SIZE
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

// the overlay is given an additional non-emotion class so it can be used as a
// selector in the container's style
const overlaySelector = 'overlay'

const baseOverlayStyle = cx(
    overlaySelector,
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
    const overlayStyle = cx(baseOverlayStyle, overlayClass)
    const containerStyle = cx(
        baseContainerStyle,
        css({
            width: size,
            height: size,
            [`:not(:hover) .${overlaySelector}`]: {
                display: 'none'
            }
        }),
        highlighted === false
            ? highlightBackgroundStyle
            : undefined
    )

    let image: JSX.Element | undefined
    if (!album.placeholder) {
        image = (
            // lazy loading causes problems with html2canvas so keep it default
            <img className={imageStyle}
                src={album.url}
                alt={album.name}
                crossOrigin='anonymous'/>
        )
    }

    return (
        <div className={containerStyle}
                draggable={!album.placeholder}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onMouseEnter={onMouseEnter}
                title={album.placeholder ? undefined : album.name}>
            {image}
            <div className={overlayStyle}>
                {children}
            </div>
        </div>
    )
}
