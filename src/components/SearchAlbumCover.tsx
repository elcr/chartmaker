import React, { FC, useRef } from 'react'
import { useDrag } from 'react-dnd'

import { Album } from '../state'
import { AlbumCover } from './AlbumCover'


export type SearchDragItem = {
    type: 'Search'
    id: number
}


type Props = {
    details: Album
    sizeRem: number
}


export const SearchAlbumCover: FC<Props> = ({ details, sizeRem }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [ { dragged }, connectDrag ] = useDrag({
        item: {
            type: 'Search',
            id: details.id
        } as SearchDragItem,
        collect: monitor => ({
            dragged: monitor.isDragging()
        })
    })

    connectDrag(ref)

    return (
        <AlbumCover innerRef={ref}
            details={details}
            sizeRem={sizeRem}
            dragged={dragged}/>
    )
}
