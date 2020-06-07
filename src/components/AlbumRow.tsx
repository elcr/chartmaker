import React, { FC } from 'react'
import { css } from 'emotion'

import { Album as AlbumDetails } from '../reducer'
import { Album } from './Album'


type Props = {
    albums: (AlbumDetails | null)[]
    sizeRem: number
}


const style = css({
    display: 'flex'
})


export const AlbumRow: FC<Props> = ({ albums, sizeRem }) => {
    const row = albums.map((album, index) => {
        const key = album === null
            ? index
            : `${index}-${album.title}`
        return <Album key={key} details={album} sizeRem={sizeRem}/>
    })
    return (
        <div className={style}>
            {row}
        </div>
    )
}
