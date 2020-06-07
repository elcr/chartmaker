import React, { FC } from 'react'
import { css } from 'emotion'

import { Album } from '../reducer'
import { AlbumRow } from './AlbumRow'


type Props = {
    albums: (Album | null)[]
}


const style = css({
    padding: '1rem',
    border: '1px solid white',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})


export const Chart: FC<Props> = ({ albums }) =>
    <main className={style}>
        <AlbumRow albums={albums} to={5} size={9}/>
        <AlbumRow albums={albums} from={5} to={11} size={7.45}/>
        <AlbumRow albums={albums} from={11} to={17} size={7.45}/>
        <AlbumRow albums={albums} from={17} to={24} size={6.35}/>
        <AlbumRow albums={albums} from={24} to={31} size={6.35}/>
        <AlbumRow albums={albums} from={31} size={4.865}/>
    </main>
