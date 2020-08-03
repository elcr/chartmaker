import React from 'react'
import { render } from 'react-dom'

import { Album, Size } from '@/types'
import { AlbumRow } from '@/components/AlbumRow'

import { RenderContainer, ignore } from '../utils'


jest.mock('@/components/ChartAlbumCover')


const container = new RenderContainer()


test('renders album covers', () => {
    const albums: Album[] = [...Array(5).keys()].map(index => ({
        placeholder: true,
        id: index
    }))

    render(
        <AlbumRow dispatch={ignore}
            albums={albums}
            size={'5rem' as Size}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
