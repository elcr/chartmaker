import type { FC } from 'react'

import type { AlbumRow } from '@/state'
import type { Album } from '@/types'
import { EditorAlbumRow } from '@/components/EditorAlbumRow'
import type { DispatchProps } from '@/reducer'
import { AlbumRowsContainer } from '@/components/AlbumRowsContainer'


export type EditorAlbumRowsContainerProps = DispatchProps & {
    rows: AlbumRow<Album>[]
    highlighted: number | undefined
}


export const EditorAlbumRowsContainer: FC<EditorAlbumRowsContainerProps> = ({
    dispatch,
    rows,
    highlighted
}) => {
    const elements = rows.map(({ albums, size }, index) =>
        <EditorAlbumRow key={index}
            dispatch={dispatch}
            albums={albums}
            size={size}
            highlighted={highlighted}/>
    )
    return (
        <AlbumRowsContainer dispatch={dispatch}>
            {elements}
        </AlbumRowsContainer>
    )
}
