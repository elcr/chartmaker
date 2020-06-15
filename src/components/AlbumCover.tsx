import React, { FC, DragEvent } from 'react'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { Image } from './Image'
import { formatAlbumTitle } from '../utils'


type Props = {
    album: Album
    sizeRem: number
    onDragStart: (event: DragEvent<HTMLDivElement>) => void
    onDragOver?: (event: DragEvent<HTMLDivElement>) => void
    onDragEnter?: (event: DragEvent<HTMLDivElement>) => void
    onDrop?: (event: DragEvent<HTMLDivElement>) => void
}


const baseStyle = css({
    backgroundColor: 'white',
    margin: '0.15rem'
})


export const AlbumCover: FC<Props> = ({ album, sizeRem, onDragStart, onDragEnter, onDragOver, onDrop }) => {
    const style = cx(
        baseStyle,
        css({
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`
        })
    )

    let image: JSX.Element | undefined
    if (!album.placeholder) {
        const title = formatAlbumTitle(album)
        image = <Image url={album.url} alt={title} title={title}/>
    }

    return (
        <div className={style}
                draggable={!album.placeholder}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}>
            {image}
        </div>
    )
}
