import React, { FC } from 'react'
import { css, cx } from 'emotion'
import { Album as AlbumDetails, formatAlbumTitle } from '../state'


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
    const image = details === null
        ? null
        : <img src={details.image.smallURL} alt={formatAlbumTitle(details)}/>
    return (
        <div className={style}>
            {image}
        </div>
    )
}
