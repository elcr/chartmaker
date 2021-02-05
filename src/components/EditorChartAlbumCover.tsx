import type { FC, DragEvent } from 'react'

import type { Album } from '@/types'
import type { DispatchProps } from '@/reducer'
import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'
import { getAlbumID, identifiedAlbumIsPlaceholder } from '@/utils'
import { ChartAlbumCover } from '@/components/ChartAlbumCover'


const chartPattern = /^chart-([0-9]+)$/
const searchPattern = /^search-([0-9]+)$/


function matchDragEventData(
    event: DragEvent<HTMLDivElement>,
    pattern: RegExp
): number | null {
    for (const type of event.dataTransfer.types) {
        const match = type.match(pattern)?.[1]
        if (match !== undefined) {
            return Number(match)
        }
    }
    return null
}


function dragOver(event: DragEvent<HTMLDivElement>) {
    for (const type of event.dataTransfer.types) {
        if (type === 'Files' || searchPattern.test(type)) {
            event.dataTransfer.dropEffect = 'copy'
            event.preventDefault()
            return
        }
        if (chartPattern.test(type)) {
            event.dataTransfer.dropEffect = 'move'
            event.preventDefault()
            return
        }
    }
}


export type EditorChartAlbumCoverProps = DispatchProps & {
    album: Album
    size: string
    highlighted: number | null
}


export const EditorChartAlbumCover: FC<EditorChartAlbumCoverProps> = ({
    dispatch,
    album,
    size,
    highlighted
}) => {
    const id = getAlbumID(album)

    function dragEnter(event: DragEvent<HTMLDivElement>) {
        const sourceID = matchDragEventData(event, chartPattern)
        if (sourceID === null) {
            return
        }
        dispatch({
            tag: 'DragChartAlbum',
            sourceID,
            targetID: id
        })
        event.preventDefault()
    }

    function drop(event: DragEvent<HTMLDivElement>) {
        const file: File | undefined = event.dataTransfer.files[0]
        if (file !== undefined) {
            dispatch({
                tag: 'DropExternalFile',
                file,
                targetID: id
            })
            event.preventDefault()
            return
        }

        const sourceIndex = matchDragEventData(event, searchPattern)
        if (sourceIndex === null) {
            return
        }
        dispatch({
            tag: 'DropSearchAlbum',
            sourceIndex,
            targetID: id
        })
        event.preventDefault()
    }

    let dragStart: ((event: DragEvent<HTMLDivElement>) => void) | undefined
    let buttons: JSX.Element | undefined
    if (!identifiedAlbumIsPlaceholder(album)) {
        dragStart = event => {
            event.dataTransfer.setData(`chart-${id}`, '')
            event.dataTransfer.effectAllowed = 'copyMove'
        }
        buttons = (
            <>
                <RenameAlbumButton dispatch={dispatch} id={id}/>
                <DeleteAlbumButton dispatch={dispatch} id={id}/>
            </>
        )
    }

    return (
        <ChartAlbumCover dispatch={dispatch}
                album={album}
                size={size}
                onDragStart={dragStart}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDrop={drop}
                highlighted={highlighted}>
            {buttons}
        </ChartAlbumCover>
    )
}
