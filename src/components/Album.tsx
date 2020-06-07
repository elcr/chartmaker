import React, { FC } from 'react'
import { css, cx } from 'emotion'
import { Album as Details } from '../reducer'


type Props = {
    details: Details | null
    size: number
}


const baseStyle = css({
    backgroundColor: 'white',
    margin: '0.15rem'
})


export const Album: FC<Props> = ({ details, size }) => {
    const style = cx(
        baseStyle,
        css({
            width: `${size}rem`,
            height: `${size}rem`
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
