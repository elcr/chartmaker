import React, { FC, DragEvent } from 'react'
import { css } from 'emotion'

import { Album } from '@/types'
import { DispatchProps } from '@/reducer'
import { ALBUM_BUTTONS_PADDING_SIZE } from '@/style'
import { AlbumCover } from '@/components/AlbumCover'
import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'


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


const overlayStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: ALBUM_BUTTONS_PADDING_SIZE
})


export type ChartAlbumCoverProps = DispatchProps & {
    album: Album
    size: string
    highlighted: boolean | undefined
}


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = ({
    dispatch,
    album,
    size,
    highlighted
}) => {
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
        const file: File | undefined = event.dataTransfer.files[0]
        if (file !== undefined) {
            dispatch({
                tag: 'DropExternalFile',
                file,
                targetID: album.id
            })
            event.preventDefault()
            return
        }

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

    let mouseEnter: (() => void) | undefined
    let buttons: JSX.Element | undefined
    if (!album.placeholder) {
        mouseEnter = () => dispatch({
            tag: 'HighlightAlbum',
            targetID: album.id
        })
        buttons = (
            <>
                <RenameAlbumButton dispatch={dispatch} id={album.id}/>
                <DeleteAlbumButton dispatch={dispatch} id={album.id}/>
            </>
        )
    }

    return (
        <AlbumCover album={album}
                size={size}
                onDragStart={dragStart}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDrop={drop}
                onMouseEnter={mouseEnter}
                overlayClass={overlayStyle}
                highlighted={highlighted}>
            {buttons}
        </AlbumCover>
    )
}
