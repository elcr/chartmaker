import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Chart as ChartDetails } from '../state'
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


export const Chart: FunctionComponent<Props> = ({ dispatch, details: { albums, name } }) => {
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
            titles.push(album.name)
        }
        return <TitleGroup key={index} titles={titles}/>
    })

    return (
        <main class={outContainerStyle}>
            <h1>{name}</h1>
            <div class={innerContainerStyle}>
                <div class={chartStyle}>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[0]}
                        size={VERY_LARGE_ROW_SIZE}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[1]}
                        size={LARGE_ROW_SIZE}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[2]}
                        size={LARGE_ROW_SIZE}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[3]}
                        size={MEDIUM_ROW_SIZE}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[4]}
                        size={MEDIUM_ROW_SIZE}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[5]}
                        size={SMALL_ROW_SIZE}/>
                </div>
                <div>
                    {titleGroups}
                </div>
            </div>
        </main>
    )
}
