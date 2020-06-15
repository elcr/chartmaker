import React, { FC, DragEvent } from 'react'

import { Album } from '../state'
import { AlbumCover } from './AlbumCover'
import { DispatchProps } from '../reducer'


const chartPattern = /^chart-(.+)$/
const searchPattern = /^search-(.+)$/


function getAlbumID(
    event: DragEvent<HTMLDivElement>,
    pattern: RegExp
): number | null {
    for (const type of event.dataTransfer.types) {
        const match = type.match(pattern)?.[1]
        const id = Number(match)
        if (!Number.isNaN(id)) {
            return id
        }
    }
    return null
}


function dragOver(event: DragEvent<HTMLDivElement>) {
    for (const type of event.dataTransfer.types) {
        if (chartPattern.test(type)) {
            event.dataTransfer.dropEffect = 'move'
            event.preventDefault()
            return
        }
        if (searchPattern.test(type)) {
            event.dataTransfer.dropEffect = 'copy'
            event.preventDefault()
            return
        }
    }
}


type Props = DispatchProps<'DragChartAlbum' | 'DropSearchAlbum'> & {
    album: Album
    sizeRem: number
}


export const ChartAlbumCover: FC<Props> = ({ dispatch, album, sizeRem }) => {
    function dragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData(`chart-${album.id}`, '')
        event.dataTransfer.effectAllowed = 'copyMove'
    }

    function dragEnter(event: DragEvent<HTMLDivElement>) {
        const sourceID = getAlbumID(event, chartPattern)
        if (sourceID === null) {
            return
        }
        dispatch({
            tag: 'DragChartAlbum',
            sourceID,
            targetID: album.id
        })
        event.preventDefault()
    }

    function drop(event: DragEvent<HTMLDivElement>) {
        const sourceID = getAlbumID(event, searchPattern)
        if (sourceID === null) {
            return
        }
        dispatch({
            tag: 'DropSearchAlbum',
            sourceID,
            targetID: album.id
        })
        event.preventDefault()
    }

    return (
        <AlbumCover album={album}
            sizeRem={sizeRem}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDrop={drop}/>
    )
}
