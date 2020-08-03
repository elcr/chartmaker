import React from 'react'
import { render } from 'react-dom'

import { NamedAlbum } from '@/types'
import { SearchResults } from '@/components/SearchResults'

import { RenderContainer } from '../utils'


jest.mock('@/components/SidebarGroup')
jest.mock('@/components/SearchAlbumCover')


const container = new RenderContainer()


test('renders album covers', () => {
    const albums: NamedAlbum[] = [ ...Array(5).keys() ].map(index => ({
        placeholder: false,
        id: index,
        name: `Test album ${index}`,
        url: `https://test.com/${index}`
    }))

    render(
        <SearchResults albums={albums}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
