import React, { FC, DragEvent } from 'react'
import { css } from 'emotion'

import { Album, Size } from '@/types'
import { DispatchProps } from '@/reducer'
import { ALBUM_BUTTONS_PADDING_SIZE } from '@/style'
import { AlbumCover } from '@/components/AlbumCover'
import { AlbumActionButton } from '@/components/AlbumActionButton'


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


const overlayStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: ALBUM_BUTTONS_PADDING_SIZE
})


export type ChartAlbumCoverProps = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
> & {
    album: Album
    size: Size
}


export const ChartAlbumCover: FC<ChartAlbumCoverProps> = ({
    dispatch,
    album,
    size
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

    let buttons: JSX.Element | undefined
    if (!album.placeholder) {
        function rename() {
            dispatch({
                tag: 'PromptToRenameAlbum',
                id: album.id
            })
        }

        function remove() {
            dispatch({
                tag: 'DeleteAlbum',
                id: album.id
            })
        }

        buttons = (
            <>
                <AlbumActionButton onClick={rename} title='Rename'>
                    ✏️
                </AlbumActionButton>
                <AlbumActionButton onClick={remove} title='Delete'>
                    🗑️
                </AlbumActionButton>
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
                overlayClass={overlayStyle}>
            {buttons}
        </AlbumCover>
    )
}
