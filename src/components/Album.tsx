import React, { FC } from 'react'
import { css, cx } from 'emotion'

import { Album as AlbumDetails, formatAlbumTitle } from '../state'
import { Image } from './Image'


type Props = {
    details: AlbumDetails | null
    sizeRem: number
}


const baseStyle = css({
    backgroundColor: 'white',
    margin: '0.15rem'
})


export const Album: FC<Props> = ({ details, sizeRem }) => {
    const style = cx(
        baseStyle,
        css({
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`
        })
    )
    let image: JSX.Element | null = null
    if (details !== null) {
        const title = formatAlbumTitle(details)
        image = (
            <Image url={details.image.largeURL}
                alt={title}
                title={title}/>
        )
    }
    return (
        <div className={style}>
            {image}
        </div>
    )
}
