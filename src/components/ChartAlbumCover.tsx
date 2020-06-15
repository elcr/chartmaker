import React, { FC, useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Album } from '../state'
import { DispatchProps } from '../reducer'
import { AlbumCover } from './AlbumCover'
import { SearchDragItem } from './SearchAlbumCover'


type ChartDragItem = {
    type: 'Chart'
    id: number
}


type Props = DispatchProps<'DragChartAlbum' | 'DropSearchAlbum'> & {
    details: Album
    sizeRem: number
}


export const ChartAlbumCover: FC<Props> = ({ dispatch, details, sizeRem }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [ { dragged }, connectDrag ] = useDrag({
        item: {
            type: 'Chart',
            id: details.id
        } as ChartDragItem,
        collect: monitor => ({
            dragged: monitor.isDragging()
        })
    })

    const [ , connectChartDrop ] = useDrop({
        accept: 'Chart',
        hover: (source: ChartDragItem) => {
            if (source.id === details.id) {
                return
            }
            dispatch({
                tag: 'DragChartAlbum',
                sourceID: source.id,
                targetID: details.id
            })
        }
    })

    const [ , connectSearchDrop ] = useDrop({
        accept: 'Search',
        drop: (source: SearchDragItem) =>
            dispatch({
                tag: 'DropSearchAlbum',
                sourceID: source.id,
                targetID: details.id
            })
    })

    useEffect(() => {
        if (!details.placeholder) {
            connectDrag(ref)
        }
        connectChartDrop(ref)
        connectSearchDrop(ref)
    }, [ connectDrag, connectChartDrop, connectSearchDrop ])

    return (
        <AlbumCover innerRef={ref}
            details={details}
            sizeRem={sizeRem}
            dragged={dragged}/>
    )
}
