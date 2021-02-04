import type { FC } from 'react'

import type { NamedAlbum } from '@/types'
import type { DispatchProps } from '@/reducer'
import { AlbumTitle } from '@/components/AlbumTitle'
import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'
import { AlbumTitlesContainer } from '@/components/AlbumTitlesContainer'


export type ViewerAlbumTitlesProps = DispatchProps & {
    groups: NamedAlbum[][]
    highlighted: number | undefined
}


export const ViewerAlbumTitles: FC<ViewerAlbumTitlesProps> = ({
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
                highlighted={highlighted}/>
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
