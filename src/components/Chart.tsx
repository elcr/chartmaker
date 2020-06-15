import { h, FunctionComponent } from 'preact'
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


type Props = DispatchProps<
    | 'DragChartAlbum'
    | 'DropSearchAlbum'
    | 'PromptToRenameAlbum'
    | 'DeleteAlbum'
> & {
    details: ChartDetails
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
                        sizeRem={VERY_LARGE_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[1]}
                        sizeRem={LARGE_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[2]}
                        sizeRem={LARGE_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[3]}
                        sizeRem={MEDIUM_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[4]}
                        sizeRem={MEDIUM_ROW_SIZE_REM}/>
                    <AlbumRow dispatch={dispatch}
                        albums={groups[5]}
                        sizeRem={SMALL_ROW_SIZE_REM}/>
                </div>
                <div>
                    {titleGroups}
                </div>
            </div>
        </main>
    )
}
