import { h, FunctionComponent } from 'preact'
import { PropRef } from 'preact/hooks'
import { css } from 'emotion'

import {
    Chart as ChartDetails,
    Album,
    NamedAlbum,
    Size
} from '../types'
import AlbumRow from './AlbumRow'
import TitleGroup from './TitleGroup'
import { DispatchProps } from '../reducer'
import {
    VERY_LARGE_ALBUM_SIZE,
    LARGE_ALBUM_SIZE,
    MEDIUM_ALBUM_SIZE,
    SMALL_ALBUM_SIZE,
    VERY_SMALL_ALBUM_SIZE,
    CONTAINER_PADDING_SIZE,
    TINY_ALBUM_SIZE,
    BORDER
} from '../style'


type Props = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
> & {
    details: ChartDetails
    innerRef: PropRef<HTMLElement>
}


const outContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    padding: CONTAINER_PADDING_SIZE,
    border: BORDER
})


const innerContainerStyle = css({
    display: 'flex'
})


const chartStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: CONTAINER_PADDING_SIZE
})


type AlbumRow = {
    albums: Album[]
    size: Size
}


type TitleGroup = string[]


function titleGroupsFromRows(rows: AlbumRow[]): TitleGroup[] {
    const titles: TitleGroup[] = []
    let lastSize = ''

    for (const row of rows) {
        const named = row.albums.filter(NamedAlbum.guard)

        if (row.size === lastSize) {
            for (const album of named) {
                titles[titles.length - 1].push(album.name)
            }
        }
        else {
            const newTitles = named.map(album => album.name)
            titles.push(newTitles)
            lastSize = row.size
        }
    }

    return titles
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


function collageGroups(albums: Album[], rowsX: number, rowsY: number): [ AlbumRow[], TitleGroup[] ] {
    const rows: AlbumRow[] = []
    const titles: TitleGroup[] = []

    for (let y = 0; y < rowsY; y++) {
        const slice = albums.slice(rowsX * y, (rowsX * y) + rowsX)
        rows.push({
            albums: slice,
            size: VERY_LARGE_ALBUM_SIZE
        })
        titles.push(
            slice.filter(NamedAlbum.guard)
                .map(album => album.name)
        )
    }

    return [ rows, titles ]
}


const Chart: FunctionComponent<Props> = ({
    dispatch,
    details: { albums, name, shape, rowsX, rowsY },
    innerRef
}) => {
    let rows: AlbumRow[]
    let titles: TitleGroup[]
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
        titles = titleGroupsFromRows(rows)
    }
    else {
        [ rows, titles ] = collageGroups(albums, rowsX, rowsY)
    }

    const rowElements = rows.map((row, index) =>
        <AlbumRow {...row}
            key={index}
            dispatch={dispatch}/>
    )
    const titleElements = titles.map((titles, index) => {
        const group = titles.map((title, index) =>
            <div key={index}>
                {title}
            </div>
        )
        return (
            <TitleGroup key={index}>
                {group}
            </TitleGroup>
        )
    })

    return (
        <main ref={innerRef} class={outContainerStyle}>
            <h1>{name}</h1>
            <div class={innerContainerStyle}>
                <div class={chartStyle}>
                    {rowElements}
                </div>
                <div>
                    {titleElements}
                </div>
            </div>
        </main>
    )
}


export default Chart
