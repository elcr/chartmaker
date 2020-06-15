import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Album } from '../state'
import { SidebarGroup } from './SidebarGroup'
import { LARGE_ROW_SIZE_REM } from '../constants'
import { SearchAlbumCover } from './SearchAlbumCover'


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
            sizeRem={LARGE_ROW_SIZE_REM}/>
    )

    return (
        <SidebarGroup>
            <div class={style}>
                {albumCovers}
            </div>
        </SidebarGroup>
    )
}
