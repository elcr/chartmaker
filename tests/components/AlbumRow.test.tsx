import React from 'react'
import { render } from 'react-dom'

import { Size } from '@/types'
import { AlbumRow } from '@/components/AlbumRow'

import { RenderContainer, ignore, createTestPlaceholderAlbums } from '../utils'


jest.mock('@/components/ChartAlbumCover')


const container = new RenderContainer()


test('renders album covers', () => {
    render(
        <AlbumRow dispatch={ignore}
            albums={createTestPlaceholderAlbums(5)}
            size={'5rem' as Size}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
