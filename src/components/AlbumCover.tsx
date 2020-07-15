import React, { FC, DragEvent } from 'react'
import { css, cx } from 'emotion'

import { TEXT_COLOUR, ALBUM_PADDING_SIZE } from '../style'
import { Size, Album } from '../types'


type Props = {
    album: Album
    size: Size
    onDragStart: (event: DragEvent<HTMLDivElement>) => void
    onDragOver?: (event: DragEvent<HTMLDivElement>) => void
    onDragEnter?: (event: DragEvent<HTMLDivElement>) => void
    onDrop?: (event: DragEvent<HTMLDivElement>) => void
    overlayClass?: string
}


const baseContainerStyle = css({
    position: 'relative',
    backgroundColor: TEXT_COLOUR,
    margin: ALBUM_PADDING_SIZE
})

const imageStyle = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%'
})

// the overlay is given an additional non-emotion class so it can be used as a
// selector in the container's style
const overlaySelector = 'overlay'

const baseOverlayStyle = cx(
    overlaySelector,
    imageStyle,
    css({ zIndex: 10 })
)


const AlbumCover: FC<Props> = ({
    album,
    size,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDrop,
    children,
    overlayClass
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
        })
    )

    let image: JSX.Element | undefined
    if (!album.placeholder) {
        image = (
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
                title={album.placeholder ? undefined : album.name}>
            {image}
            <div className={overlayStyle}>
                {children}
            </div>
        </div>
    )
}


export default AlbumCover
