import React from 'react'
import { render } from 'react-dom'

import { SearchResults } from '@/components/SearchResults'

import { RenderContainer, createTestNamedAlbums } from '../utils'


jest.mock('@/components/SidebarGroup')
jest.mock('@/components/SearchAlbumCover')


const container = new RenderContainer()


test('renders album covers', () => {
    render(
        <SearchResults albums={createTestNamedAlbums(5)}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
