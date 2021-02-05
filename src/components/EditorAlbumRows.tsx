import type { FC } from 'react'

import { AlbumRow as RowState, getAlbumID } from '@/utils'
import type { DispatchProps } from '@/reducer'
import { AlbumRowsContainer } from '@/components/AlbumRowsContainer'
import { EditorChartAlbumCover } from '@/components/EditorChartAlbumCover'
import { AlbumRow } from '@/components/AlbumRow'


export type EditorAlbumRowsProps = DispatchProps & {
    rows: RowState[]
    highlighted: number | null
}


export const EditorAlbumRows: FC<EditorAlbumRowsProps> = ({
    dispatch,
    rows,
    highlighted
}) => {
    const elements = rows.map(({ albums, size }, index) => {
        const covers = albums.map(album =>
            <EditorChartAlbumCover key={getAlbumID(album)}
                dispatch={dispatch}
                album={album}
                highlighted={highlighted}
                size={size}/>
        )
        return (
            <AlbumRow key={index}>
                {covers}
            </AlbumRow>
        )
    })
    return (
        <AlbumRowsContainer dispatch={dispatch}>
            {elements}
        </AlbumRowsContainer>
    )
}
