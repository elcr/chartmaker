import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Album } from '../state'
import { SidebarGroup } from './SidebarGroup'
import { SearchAlbumCover } from './SearchAlbumCover'
import { LARGE_ROW_SIZE } from '../style'


type Props = {
    albums: Album[]
}


const style = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
})


export const SearchResults: FunctionComponent<Props> = ({ albums }) => {
    const albumCovers = albums.map(album =>
        <SearchAlbumCover key={album.id}
            album={album}
            size={LARGE_ROW_SIZE}/>
    )

    return (
        <SidebarGroup>
            <div class={style}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
