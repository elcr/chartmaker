import type { ComponentType, Ref } from 'react'
import { css } from 'emotion'

import type { ChartShape } from '@/types'
import type { DispatchProps } from '@/reducer'
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


export const rowsID = 'rows'
export const titlesID = 'titles'


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


type AlbumRow<TAlbum> = {
    albums: TAlbum[]
    size: string
}

export type AlbumRowComponentProps<TAlbum> = AlbumRow<TAlbum>

export type TitleGroupComponentProps<TNamedAlbum> = {
    group: TNamedAlbum[]
}

export type ChartProps<TNamedAlbum, TPlaceholderAlbum> = DispatchProps & {
    albums: (TNamedAlbum | TPlaceholderAlbum)[]
    isNamedAlbum: (album: TNamedAlbum | TPlaceholderAlbum) => album is TNamedAlbum
    name: string
    shape: ChartShape
    rowsX: number
    rowsY: number
    innerRef: Ref<HTMLElement>
    albumRowComponent: ComponentType<AlbumRowComponentProps<TNamedAlbum | TPlaceholderAlbum>>
    titleGroupComponent: ComponentType<TitleGroupComponentProps<TNamedAlbum>>
}


function top40Rows<TAlbum>(albums: TAlbum[]): AlbumRow<TAlbum>[] {
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


function top42Rows<TAlbum>(albums: TAlbum[]): AlbumRow<TAlbum>[] {
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


function top100Rows<TAlbum>(albums: TAlbum[]): AlbumRow<TAlbum>[] {
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


function titleGroupsFromRows<TNamedAlbum, TPlaceholderAlbum>(
    rows: AlbumRow<TNamedAlbum | TPlaceholderAlbum>[],
    isNamedAlbum: (album: TNamedAlbum | TPlaceholderAlbum) => album is TNamedAlbum
): TNamedAlbum[][] {
    const groups: TNamedAlbum[][] = []
    let lastSize = ''

    for (const row of rows) {
        const named = row.albums.filter(isNamedAlbum)

        if (row.size === lastSize) {
            for (const album of named) {
                groups[groups.length - 1]!.push(album)
            }
        }
        else {
            groups.push(named)
            lastSize = row.size
        }
    }

    return groups
}


function collageGroups<TNamedAlbum, TPlaceholderAlbum>(
    albums: (TNamedAlbum | TPlaceholderAlbum)[],
    rowsX: number,
    rowsY: number,
    isNamedAlbum: (album: TNamedAlbum | TPlaceholderAlbum) => album is TNamedAlbum
): [ AlbumRow<TNamedAlbum | TPlaceholderAlbum>[], TNamedAlbum[][] ] {
    const rows: AlbumRow<TNamedAlbum | TPlaceholderAlbum>[] = []
    const groups: TNamedAlbum[][] = []

    for (let y = 0; y < rowsY; y++) {
        const slice = albums.slice(rowsX * y, (rowsX * y) + rowsX)
        rows.push({
            albums: slice,
            size: LARGE_ALBUM_SIZE
        })
        groups.push(
            slice.filter(isNamedAlbum)
        )
    }

    return [ rows, groups ]
}


export function Chart<TNamedAlbum, TPlaceholderAlbum>({
    dispatch,
    albums,
    name,
    shape,
    rowsX,
    rowsY,
    innerRef,
    isNamedAlbum,
    albumRowComponent: AlbumRowComponent,
    titleGroupComponent: TitleGroupComponent
}: ChartProps<TNamedAlbum, TPlaceholderAlbum>) {
    let rows: AlbumRow<TNamedAlbum | TPlaceholderAlbum>[]
    let groups: TNamedAlbum[][]
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
        groups = titleGroupsFromRows(rows, isNamedAlbum)
    }
    else {
        [ rows, groups ] = collageGroups(albums, rowsX, rowsY, isNamedAlbum)
    }

    const rowElements = rows.map((row, index) =>
        <AlbumRowComponent {...row} key={index}/>
    )
    const titleElements = groups.map((group, index) =>
        <TitleGroupComponent key={index} group={group}/>
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
