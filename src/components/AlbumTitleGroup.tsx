import React, { FC } from 'react'
import { css } from 'emotion'

import { TITLES_PADDING_SIZE, TITLES_FONT_SIZE } from '@/style'
import { DispatchProps } from '@/reducer'
import { NamedAlbum } from '@/types'
import { AlbumTitle } from '@/components/AlbumTitle'


const style = css({
    marginBottom: TITLES_PADDING_SIZE,
    fontSize: TITLES_FONT_SIZE
})


export type AlbumTitleGroupProps = DispatchProps<
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
    | 'HighlightAlbum'
> & {
    albums: NamedAlbum[]
    highlighted: number | undefined
}


export const AlbumTitleGroup: FC<AlbumTitleGroupProps> = ({
    dispatch,
    highlighted,
    albums
}) => {
    const titles = albums.map((album, index) =>
        <AlbumTitle key={index}
                dispatch={dispatch}
                id={album.id}
                highlighted={highlighted === undefined
                    ? undefined
                    : album.id === highlighted}>
            {album.name}
        </AlbumTitle>
    )

    return (
        <div className={style}>
            {titles}
        </div>
    )
}
