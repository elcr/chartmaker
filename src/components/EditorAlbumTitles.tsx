import type { FC } from 'react'

import type { NamedAlbum } from '@/types'
import type { DispatchProps } from '@/reducer'
import { AlbumTitlesContainer } from '@/components/AlbumTitlesContainer'
import { AlbumTitle } from '@/components/AlbumTitle'
import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'
import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'


export type EditorAlbumTitlesProps = DispatchProps & {
    groups: NamedAlbum[][]
    highlighted: number | undefined
}


export const EditorAlbumTitles: FC<EditorAlbumTitlesProps> = ({
    dispatch,
    groups,
    highlighted
}) => {
    const elements = groups.map((group, index) => {
        const titles = group.map(({ id, name }) =>
            <AlbumTitle key={id}
                    dispatch={dispatch}
                    id={id}
                    name={name}
                    highlighted={highlighted}>
                <RenameAlbumButton dispatch={dispatch} id={id}/>
                <DeleteAlbumButton dispatch={dispatch} id={id}/>
            </AlbumTitle>
        )
        return (
            <AlbumTitleGroup key={index}>
                {titles}
            </AlbumTitleGroup>
        )
    })
    return (
        <AlbumTitlesContainer dispatch={dispatch}>
            {elements}
        </AlbumTitlesContainer>
    )
}
