import type { FC } from 'react'

import type { Album } from '@/types'
import type { DispatchProps } from '@/reducer'
import { EditorChartAlbumCover } from '@/components/EditorChartAlbumCover'
import { getAlbumID } from '@/state'
import { AlbumRow } from '@/components/AlbumRow'


export type EditorAlbumRowProps = DispatchProps & {
    albums: Album[]
    size: string
    highlighted: number | undefined
}


export const EditorAlbumRow: FC<EditorAlbumRowProps> = ({
    dispatch,
    albums,
    size,
    highlighted
}) => {
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
        <AlbumRow>
            {covers}
        </AlbumRow>
    )
}
