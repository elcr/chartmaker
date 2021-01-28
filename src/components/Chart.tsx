import React, { FC, Ref } from 'react'
import { css } from 'emotion'

import { Chart as ChartDetails, Album, NamedAlbum } from '@/types'
import { DispatchProps } from '@/reducer'
import {
    VERY_LARGE_ALBUM_SIZE,
    LARGE_ALBUM_SIZE,
    MEDIUM_ALBUM_SIZE,
    SMALL_ALBUM_SIZE,
    VERY_SMALL_ALBUM_SIZE,
    CONTAINER_PADDING_SIZE,
    TINY_ALBUM_SIZE,
    BORDER
} from '@/style'
import { AlbumRow } from '@/components/AlbumRow'
import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'


export const rowsID = 'rows'
export const titlesID = 'titles'


export type ChartProps = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
    | 'DropExternalFile'
    | 'HighlightAlbum'
    | 'UnhighlightAlbum'
> & {
    innerRef: Ref<HTMLElement>
    highlighted: number | undefined
} & ChartDetails


const outContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    padding: CONTAINER_PADDING_SIZE,
    border: BORDER
})


const innerContainerStyle = css({
    display: 'flex',
    alignItems: 'flex-start'
})


const chartStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: CONTAINER_PADDING_SIZE
})


type AlbumRow = {
    albums: Album[]
    size: string
}


function top40Rows(albums: Album[]): AlbumRow[] {
    return [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(5, 11),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(11, 17),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(17, 24),
            size: MEDIUM_ALBUM_SIZE
        },
        {
            albums: albums.slice(24, 31),
            size: MEDIUM_ALBUM_SIZE
        },
        {
            albums: albums.slice(31, 40),
            size: SMALL_ALBUM_SIZE
        }
    ]
}


function top42Rows(albums: Album[]): AlbumRow[] {
    return [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(5, 10),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(10, 16),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(16, 22),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(22, 32),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(32, 42),
            size: VERY_SMALL_ALBUM_SIZE
        }
    ]
}


function top100Rows(albums: Album[]): AlbumRow[] {
    return [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(5, 10),
            size: VERY_LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(10, 16),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(16, 22),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(22, 28),
            size: LARGE_ALBUM_SIZE
        },
        {
            albums: albums.slice(28, 38),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(38, 48),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(48, 58),
            size: VERY_SMALL_ALBUM_SIZE
        },
        {
            albums: albums.slice(58, 72),
            size: TINY_ALBUM_SIZE
        },
        {
            albums: albums.slice(72, 86),
            size: TINY_ALBUM_SIZE
        },
        {
            albums: albums.slice(86, 100),
            size: TINY_ALBUM_SIZE
        }
    ]
}


type AlbumTitleGroup = NamedAlbum[]


function titleGroupsFromRows(rows: AlbumRow[]): AlbumTitleGroup[] {
    const groups: AlbumTitleGroup[] = []
    let lastSize = ''

    for (const row of rows) {
        const named = row.albums.filter(NamedAlbum.guard)

        if (row.size === lastSize) {
            for (const album of named) {
                groups[groups.length - 1].push(album)
            }
        }
        else {
            groups.push(named)
            lastSize = row.size
        }
    }

    return groups
}


function collageGroups(albums: Album[], rowsX: number, rowsY: number): [ AlbumRow[], AlbumTitleGroup[] ] {
    const rows: AlbumRow[] = []
    const groups: AlbumTitleGroup[] = []

    for (let y = 0; y < rowsY; y++) {
        const slice = albums.slice(rowsX * y, (rowsX * y) + rowsX)
        rows.push({
            albums: slice,
            size: LARGE_ALBUM_SIZE
        })
        groups.push(
            slice.filter(NamedAlbum.guard)
        )
    }

    return [ rows, groups ]
}


export const Chart: FC<ChartProps> = ({
    dispatch,
    albums,
    name,
    shape,
    rowsX,
    rowsY,
    innerRef,
    highlighted
}) => {
    let rows: AlbumRow[]
    let groups: AlbumTitleGroup[]
    if (shape.tag === 'Top') {
        switch (shape.size) {
            case 40:
                rows = top40Rows(albums)
                break
            case 42:
                rows = top42Rows(albums)
                break
            case 100:
                rows = top100Rows(albums)
        }
        groups = titleGroupsFromRows(rows)
    }
    else {
        [ rows, groups ] = collageGroups(albums, rowsX, rowsY)
    }

    const rowElements = rows.map((row, index) =>
        <AlbumRow {...row}
            key={index}
            dispatch={dispatch}
            highlighted={highlighted}/>
    )
    const titleElements = groups.map((albums, index) =>
        <AlbumTitleGroup key={index}
            dispatch={dispatch}
            albums={albums}
            highlighted={highlighted}/>
    )

    function mouseLeave() {
        dispatch({ tag: 'UnhighlightAlbum' })
    }

    return (
        <main ref={innerRef} className={outContainerStyle}>
            <h1>{name}</h1>
            <div className={innerContainerStyle}>
                <div id={rowsID} className={chartStyle} onMouseLeave={mouseLeave}>
                    {rowElements}
                </div>
                <div id={titlesID} onMouseLeave={mouseLeave}>
                    {titleElements}
                </div>
            </div>
        </main>
    )
}
