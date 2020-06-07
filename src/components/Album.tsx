import React, { FC } from 'react'
import { css, cx } from 'emotion'
import { Album as AlbumDetails } from '../reducer'


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
        : <img src={details.imageURL} alt={details.title}/>
    return (
        <div className={style}>
            {image}
        </div>
    )
}
