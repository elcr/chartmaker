import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { NamedAlbum } from '../types'
import { SidebarGroup } from './SidebarGroup'
import { SearchAlbumCover } from './SearchAlbumCover'
import { LARGE_ALBUM_SIZE } from '../style'


type Props = {
    albums: NamedAlbum[]
}


const style = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
})


export const SearchResults: FunctionComponent<Props> = ({ albums }) => {
    const albumCovers = albums.map(album =>
        <SearchAlbumCover key={album.id}
            album={album}
            size={LARGE_ALBUM_SIZE}/>
    )

    return (
        <SidebarGroup>
            <div class={style}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
