import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { NamedAlbum } from '../types'
import { SidebarGroup } from './SidebarGroup'
import { SearchAlbumCover } from './SearchAlbumCover'
import { LARGE_ALBUM_SIZE } from '../style'


type Props = {
    albums: NamedAlbum[]
}


const containerStyle = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
})


const groupStyle = css({
    overflowY: 'scroll'
})


export const SearchResults: FunctionComponent<Props> = ({ albums }) => {
    const albumCovers = albums.map(album =>
        <SearchAlbumCover key={album.id}
            album={album}
            size={LARGE_ALBUM_SIZE}/>
    )

    return (
        <SidebarGroup class={groupStyle}>
            <div class={containerStyle}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
