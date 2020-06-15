import React, { FC, DragEvent } from 'react'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { Image } from './Image'
import { DispatchProps } from '../reducer'
import { formatAlbumTitle } from '../utils'


type Props = DispatchProps<'BeginDraggingAlbum'> & {
    details: Album
    sizeRem: number
    onDragEnter?: (event: DragEvent<HTMLDivElement>) => void
    onDragEnd: (event: DragEvent<HTMLDivElement>) => void
}


const baseStyle = css({
    backgroundColor: 'white',
    margin: '0.15rem'
})


export const AlbumCover: FC<Props> = ({ dispatch, details, sizeRem, onDragEnter, onDragEnd }) => {
    function beginDragging() {
        dispatch({
            tag: 'BeginDraggingAlbum',
            id: details.id
        })
    }

    const style = cx(
        baseStyle,
        css({
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`
        })
    )

    let image: JSX.Element | undefined
    if (!details.placeholder) {
        const title = formatAlbumTitle(details)
        image = <Image url={details.url} alt={title} title={title}/>
    }

    return (
        <div className={style}
                draggable={details.placeholder ? undefined : true}
                onDragStart={details.placeholder ? undefined : beginDragging}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}>
            {image}
        </div>
    )
}
