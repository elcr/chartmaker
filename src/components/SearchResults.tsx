import React, { FC } from 'react'

import { Album as AlbumDetails, formatAlbumTitle } from '../state'
import { css } from 'emotion'
import { SidebarGroup } from './SidebarGroup'
import { Album } from './Album'
import { LARGE_ROW_SIZE_REM } from '../constants'


type Props = {
    albums: AlbumDetails[]
}


const style = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
})


export const SearchResults: FC<Props> = ({ albums }) => {
    const albumElements = albums.map(album => {
        const title = formatAlbumTitle(album)
        return <Album key={title} details={album} sizeRem={LARGE_ROW_SIZE_REM}/>
    })

    return (
        <SidebarGroup>
            <div className={style}>
                {albumElements}
            </div>
        </SidebarGroup>
    )
}
