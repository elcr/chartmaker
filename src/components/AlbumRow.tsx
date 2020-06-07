import React, { FC } from 'react'
import { css } from 'emotion'

import { Album as AlbumDetails } from '../reducer'
import { Album } from './Album'


type Props = {
    albums: (AlbumDetails | null)[]
    size: number
    from?: number
    to?: number
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FC<Props> = ({ albums, from = 0, to = albums.length, size }) => {
    const row: JSX.Element[] = []
    for (let index = from; index < to; index++) {
        const album = albums[index] ?? null
        row.push(<Album key={index} details={album} size={size}/>)
    }
    return (
        <div className={style}>
            {row}
        </div>
    )
}
