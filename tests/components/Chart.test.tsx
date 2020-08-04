import React, { createRef } from 'react'
import { render } from 'react-dom'

import { Album } from '@/types'
import { Chart } from '@/components/Chart'

import { RenderContainer, ignore, namedAlbums } from '../utils'


jest.mock('@/components/AlbumRow')
jest.mock('@/components/TitleGroup')


const container = new RenderContainer()


const albums = namedAlbums(100)

test.each([ 40, 42, 100 ] as const)('renders with top shape', size => {
    render(
        <Chart albums={albums}
            name={`Test top ${size} chart`}
            shape={{ tag: 'Top', size }}
            rowsX={10}
            rowsY={10}
            innerRef={ignore}
            dispatch={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('renders with collage shape', () => {
    render(
        <Chart albums={albums}
            name='Test 5x7 collage chart'
            shape={{ tag: 'Collage' }}
            rowsX={5}
            rowsY={7}
            innerRef={ignore}
            dispatch={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('excludes placeholder albums from titles', () => {
    const albumsWithPlaceholders: Album[] = albums.map((album, index) =>
        index % 2 == 0
            ? album
            : { placeholder: true, id: album.id }
    )
    render(
        <Chart albums={albumsWithPlaceholders}
            name='Test chart with placeholders'
            shape={{ tag: 'Collage' }}
            rowsX={5}
            rowsY={5}
            innerRef={ignore}
            dispatch={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('passes ref', () => {
    const ref = createRef<HTMLElement>()

    render(
        <Chart albums={albums}
            name='Test 5x7 collage chart'
            shape={{ tag: 'Collage' }}
            rowsX={5}
            rowsY={7}
            innerRef={ref}
            dispatch={ignore}/>,
        container.element
    )

    expect(ref.current).toBeInstanceOf(Element)
})
