import type { FC } from 'react'

import { AlbumTitle } from '@/components/AlbumTitle'
import type { DispatchProps } from '@/reducer'
import type { NamedAlbum } from '@/types'
import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'


export type EditorAlbumTitleProps = DispatchProps & {
    album: NamedAlbum
    highlighted: number | undefined
}


export const EditorAlbumTitle: FC<EditorAlbumTitleProps> = ({
    dispatch,
    album,
    highlighted
}) =>
    <AlbumTitle dispatch={dispatch}
            id={album.id}
            name={album.name}
            highlighted={highlighted === undefined
                ? undefined
                : album.id === highlighted}>
        <RenameAlbumButton dispatch={dispatch} id={album.id}/>
        <DeleteAlbumButton dispatch={dispatch} id={album.id}/>
    </AlbumTitle>
