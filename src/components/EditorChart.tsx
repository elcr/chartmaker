import type { FC, Ref } from 'react'

import type { Chart as ChartDetails, Album, NamedAlbum } from '@/types'
import type { DispatchProps } from '@/reducer'
import { EditorAlbumRow } from '@/components/EditorAlbumRow'
import { EditorAlbumTitleGroup } from '@/components/EditorAlbumTitleGroup'
import { Chart, AlbumRowComponentProps, TitleGroupComponentProps } from '@/components/Chart'
import { identifiedAlbumIsPlaceholder } from '@/state'


function isNamedAlbum(album: Album): album is NamedAlbum {
    return !identifiedAlbumIsPlaceholder(album)
}


export type EditorChartProps =
    & DispatchProps
    & ChartDetails
    & {
        innerRef: Ref<HTMLElement>
        highlighted: number | undefined
    }


export const EditorChart: FC<EditorChartProps> = ({ dispatch, highlighted, ...props }) => {
    const AlbumRowComponent: FC<AlbumRowComponentProps<Album>> = props =>
        <EditorAlbumRow {...props}
            dispatch={dispatch}
            highlighted={highlighted}/>
    const TitleGroupComponent: FC<TitleGroupComponentProps<NamedAlbum>> = props =>
        <EditorAlbumTitleGroup {...props}
            dispatch={dispatch}
            highlighted={highlighted}/>

    return (
        <Chart {...props}
            dispatch={dispatch}
            albumRowComponent={AlbumRowComponent}
            titleGroupComponent={TitleGroupComponent}
            isNamedAlbum={isNamedAlbum}/>
    )
}
