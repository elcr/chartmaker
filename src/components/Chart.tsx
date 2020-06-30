import { h, FunctionComponent } from 'preact'
import { PropRef } from 'preact/hooks'
import { css } from 'emotion'

import {
    Chart as ChartDetails,
    Album,
    albumIsNamed
} from '../state'
import { AlbumRow } from './AlbumRow'
import { TitleGroup } from './TitleGroup'
import { DispatchProps } from '../reducer'
import {
    VERY_LARGE_ROW_SIZE,
    LARGE_ROW_SIZE,
    MEDIUM_ROW_SIZE,
    SMALL_ROW_SIZE,
    CONTAINER_PADDING_SIZE,
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
    size: string
}


type TitleGroup = string[]


function titleGroupsFromRows(rows: AlbumRow[]): TitleGroup[] {
    const titles: TitleGroup[] = []
    let lastSize = ''

    for (const row of rows) {
        const named = row.albums.filter(albumIsNamed)

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


function top40Groups(albums: Album[]): [ AlbumRow[], TitleGroup[] ] {
    const rows: AlbumRow[] = [
        {
            albums: albums.slice(0, 5),
            size: VERY_LARGE_ROW_SIZE
        },
        {
            albums: albums.slice(5, 11),
            size: LARGE_ROW_SIZE
        },
        {
            albums: albums.slice(11, 17),
            size: LARGE_ROW_SIZE
        },
        {
            albums: albums.slice(17, 24),
            size: MEDIUM_ROW_SIZE
        },
        {
            albums: albums.slice(24, 31),
            size: MEDIUM_ROW_SIZE
        },
        {
            albums: albums.slice(31, 40),
            size: SMALL_ROW_SIZE
        }
    ]
    const titles = titleGroupsFromRows(rows)

    return [ rows, titles ]
}


function collageGroups(albums: Album[], rowsX: number, rowsY: number): [ AlbumRow[], TitleGroup[] ] {
    const rows: AlbumRow[] = []
    const titles: TitleGroup[] = []

    for (let y = 0; y < rowsY; y++) {
        const slice = albums.slice(rowsX * y, (rowsX * y) + rowsX)
        rows.push({
            albums: slice,
            size: VERY_LARGE_ROW_SIZE
        })
        titles.push(
            slice.filter(albumIsNamed)
                .map(album => album.name)
        )
    }

    return [ rows, titles ]
}


export const Chart: FunctionComponent<Props> = ({
    dispatch,
    details: { albums, name, collage, rowsX, rowsY },
    innerRef
}) => {
    const [ rows, titles ] = collage
        ? collageGroups(albums, rowsX, rowsY)
        : top40Groups(albums)

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
