import React, { FC } from 'react'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { Image } from './Image'
import { DispatchProps } from '../reducer'
import { formatAlbumTitle } from '../utils'


type Props = DispatchProps<'BeginDraggingAlbum'> & {
    details: Album
    dragged: boolean
    sizeRem: number
    onDragEnter?: () => void
    onDragEnd: () => void
}


const baseStyle = css({
    backgroundColor: 'white',
    margin: '0.15rem'
})


const draggedStyle = css({
    opacity: 0
})


export const AlbumCover: FC<Props> = ({ dispatch, details, dragged, sizeRem, onDragEnter, onDragEnd }) => {
    function beginDragging() {
        dispatch({
            tag: 'BeginDraggingAlbum',
            id: details.id
        })
    }

    const style = cx(
        baseStyle,
        dragged ? draggedStyle : null,
        css({
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`
        })
    )

    let image: JSX.Element | null = null
    if (!details.placeholder) {
        const title = formatAlbumTitle(details)
        image = <Image url={details.url} alt={title} title={title}/>
    }

    return (
        <div className={style}
                draggable
                onDragStart={beginDragging}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}>
            {image}
        </div>
    )
}
