import type { FC } from 'react'

import { AlbumRow as RowState, getAlbumID } from '@/state'
import type { DispatchProps } from '@/reducer'
import { AlbumRowsContainer } from '@/components/AlbumRowsContainer'
import { EditorChartAlbumCover } from '@/components/EditorChartAlbumCover'
import { AlbumRow } from '@/components/AlbumRow'


export type EditorAlbumRowsProps = DispatchProps & {
    rows: RowState[]
    highlighted: number | undefined
}


export const EditorAlbumRows: FC<EditorAlbumRowsProps> = ({
    dispatch,
    rows,
    highlighted
}) => {
    const elements = rows.map(({ albums, size }, index) => {
        const covers = albums.map(album => {
            const id = getAlbumID(album)
            return (
                <EditorChartAlbumCover key={id}
                    dispatch={dispatch}
                    album={album}
                    highlighted={highlighted === undefined
                        ? undefined
                        : id === highlighted}
                    size={size}/>
            )
        })
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
