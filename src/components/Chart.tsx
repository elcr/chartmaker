import { h, FunctionComponent, JSX } from 'preact'
import { PropRef } from 'preact/hooks'
import { css } from 'emotion'

import {
    Chart as ChartDetails,
    Album,
    AlbumRow as AlbumRowDetails,
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


function top40Groups(albums: Album[]): AlbumRowDetails[] {
    return [
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
}


function collageGroups(albums: Album[], rowsX: number, rowsY: number): AlbumRowDetails[] {
    const groups: AlbumRowDetails[] = []
    for (let y = 0; y < rowsY; y++) {
        groups.push({
            albums: albums.slice(rowsX * y, (rowsX * y) + rowsX),
            size: LARGE_ROW_SIZE
        })
    }
    return groups
}


export const Chart: FunctionComponent<Props> = ({
    dispatch,
    details: { albums, name, collage, rowsX, rowsY },
    innerRef
}) => {
    const groups = collage
        ? collageGroups(albums, rowsX, rowsY)
        : top40Groups(albums)

    const titles: JSX.Element[][] = [[]]
    let lastSize = ''
    const albumRows: JSX.Element[] = []
    groups.forEach((group, index) => {
        albumRows.push(
            <AlbumRow {...group}
                key={index}
                dispatch={dispatch}/>
        )

        const namedAlbums = group.albums.filter(albumIsNamed)

        if (group.size === lastSize) {
            const oldTitles = titles[titles.length - 1]
            const newTitles = namedAlbums.map((album, index) =>
                <div key={oldTitles.length + index}>
                    {album.name}
                </div>
            )
            titles[titles.length - 1] = [ ...oldTitles, ...newTitles ]
        }
        else {
            const newTitles = namedAlbums.map((album, index) =>
                <div key={index}>
                    {album.name}
                </div>
            )
            titles.push(newTitles)
            lastSize = group.size
        }
    })

    const titleGroups = titles.map((group, index) =>
        <TitleGroup key={index}>
            {group}
        </TitleGroup>
    )

    return (
        <main ref={innerRef} class={outContainerStyle}>
            <h1>{name}</h1>
            <div class={innerContainerStyle}>
                <div class={chartStyle}>
                    {albumRows}
                </div>
                <div>
                    {titleGroups}
                </div>
            </div>
        </main>
    )
}
