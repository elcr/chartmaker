import type { FC } from 'react'

import type { NamedAlbum } from '@/types'
import type { DispatchProps } from '@/reducer'
import { AlbumTitlesContainer } from '@/components/AlbumTitlesContainer'
import { EditorAlbumTitleGroup } from '@/components/EditorAlbumTitleGroup'


export type EditorAlbumTitlesContainerProps = DispatchProps & {
    groups: NamedAlbum[][]
    highlighted: number | undefined
}


export const EditorAlbumTitlesContainer: FC<EditorAlbumTitlesContainerProps> = ({
    dispatch,
    groups,
    highlighted
}) => {
    const elements = groups.map((group, index) =>
        <EditorAlbumTitleGroup key={index}
            dispatch={dispatch}
            group={group}
            highlighted={highlighted}/>
    )
    return (
        <AlbumTitlesContainer dispatch={dispatch}>
            {elements}
        </AlbumTitlesContainer>
    )
}
