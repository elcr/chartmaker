import React, { FC } from 'react'
import { render } from 'react-dom'

import { Album, Size } from '@/types'
import { AlbumRow } from '@/components/AlbumRow'
import { ChartAlbumCoverProps } from '@/components/ChartAlbumCover'

import { RenderContainer, ignore } from '../utils'


const container = new RenderContainer()


const TestAlbumCover: FC<ChartAlbumCoverProps> = ({ album, size }) => {
    const json = JSON.stringify(album)
    return (
        <div className='test-album-cover'>
            {`Album: ${json}`}
            {`Size: ${size}`}
        </div>
    )
}


test('renders album covers', () => {
    const albums: Album[] = [...Array(5).keys()].map(index => ({
        placeholder: true,
        id: index
    }))

    render(
        <AlbumRow dispatch={ignore}
            albums={albums}
            size={'5rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
