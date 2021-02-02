import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import type { NamedAlbum } from '@/types'
import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'
import { EditorAlbumTitle } from '@/components/EditorAlbumTitle'


export type EditorAlbumTitleGroupProps = DispatchProps & {
    albums: NamedAlbum[]
    highlighted: number | undefined
}


export const EditorAlbumTitleGroup: FC<EditorAlbumTitleGroupProps> = ({
    dispatch,
    albums,
    highlighted
}) => {
    const titles = albums.map((album, index) =>
        <EditorAlbumTitle key={index}
            dispatch={dispatch}
            album={album}
            highlighted={highlighted}/>
    )
    return (
        <AlbumTitleGroup>
            {titles}
        </AlbumTitleGroup>
    )
}
