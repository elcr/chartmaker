import React, { FC } from 'react'
import { css } from 'emotion'

import { Chart as ChartDetails } from '../state'
import { AlbumRow } from './AlbumRow'
import { TitleGroup } from './TitleGroup'
import {
    VERY_LARGE_ROW_SIZE_REM,
    LARGE_ROW_SIZE_REM,
    MEDIUM_ROW_SIZE_REM,
    SMALL_ROW_SIZE_REM
} from '../constants'
import { DispatchProps } from '../reducer'
import { formatAlbumTitle } from '../utils'


type Props = DispatchProps<'BeginDraggingAlbum' | 'DragChartAlbum' | 'DropChartAlbum'> & {
    details: ChartDetails
    draggedAlbumID: number | null
}


const outContainerStyle = css({
    padding: '1rem',
    border: '1px solid white',
    display: 'flex',
    flexDirection: 'column'
})


const innerContainerStyle = css({
    display: 'flex'
})


const chartStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '1rem'
})


export const Chart: FC<Props> = ({ dispatch, details: { albums, name }, draggedAlbumID }) => {
    const groups = [
        albums.slice(0, 5),
        albums.slice(5, 11),
        albums.slice(11, 17),
        albums.slice(17, 24),
        albums.slice(24, 31),
        albums.slice(31)
    ]
    const titleGroups = groups.map((group, index) => {
        const titles: string[] = []
        for (const album of group) {
            if (album.placeholder) {
                continue
            }
            titles.push(formatAlbumTitle(album))
        }
        return <TitleGroup key={index} titles={titles}/>
    })

    return (
        <main className={outContainerStyle}>
            <h1>{name}</h1>
            <div className={innerContainerStyle}>
                <div className={chartStyle}>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[0]}
                        draggedAlbumID={draggedAlbumID}
                        sizeRem={VERY_LARGE_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[1]}
                        draggedAlbumID={draggedAlbumID}
                        sizeRem={LARGE_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[2]}
                        draggedAlbumID={draggedAlbumID}
                        sizeRem={LARGE_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[3]}
                        draggedAlbumID={draggedAlbumID}
                        sizeRem={MEDIUM_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[4]}
                        draggedAlbumID={draggedAlbumID}
                        sizeRem={MEDIUM_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[5]}
                        draggedAlbumID={draggedAlbumID}
                        sizeRem={SMALL_ROW_SIZE_REM}/>
                </div>
                <div>
                    {titleGroups}
                </div>
            </div>
        </main>
    )
}
