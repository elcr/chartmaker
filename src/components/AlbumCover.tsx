import React, { FC, RefObject } from 'react'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { Image } from './Image'
import { formatAlbumTitle } from '../utils'


type Props = {
    innerRef: RefObject<HTMLDivElement>
    details: Album
    sizeRem: number
    dragged: boolean
}


const baseStyle = css({
    backgroundColor: 'white',
    margin: '0.15rem'
})


const draggedStyle = css({
    opacity: 0
})


export const AlbumCover: FC<Props> = ({ innerRef, details, sizeRem, dragged }) => {
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
        <div ref={innerRef} className={style}>
            {image}
        </div>
    )
}
