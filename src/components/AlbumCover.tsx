import React, { FC, DragEvent } from 'react'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { Image } from './Image'


type Props = {
    album: Album
    sizeRem: number
    onDragStart: (event: DragEvent<HTMLDivElement>) => void
    onDragOver?: (event: DragEvent<HTMLDivElement>) => void
    onDragEnter?: (event: DragEvent<HTMLDivElement>) => void
    onDrop?: (event: DragEvent<HTMLDivElement>) => void
    overlayClassName?: string
}


const baseContainerStyle = css({
    position: 'relative',
    backgroundColor: 'white',
    margin: '0.15rem'
})


const imageStyle = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
})


const baseOverlayStyle = cx(
    imageStyle,
    css({ zIndex: 10 })
)


export const AlbumCover: FC<Props> = ({
    album,
    sizeRem,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDrop,
    children,
    overlayClassName
}) => {
    const overlayStyle = cx(baseOverlayStyle, overlayClassName)

    const containerStyle = cx(
        baseContainerStyle,
        css({
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
            [`:not(:hover) .${overlayStyle}`]: {
                display: 'none'
            }
        })
    )


    const image = album.placeholder
        ? null
        : <Image className={imageStyle}
            url={album.url}
            alt={album.name}
            title={album.name}/>

    return (
        <div className={containerStyle}
                draggable={!album.placeholder}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}>
            {image}
            <div className={overlayStyle}>
                {children}
            </div>
        </div>
    )
}
