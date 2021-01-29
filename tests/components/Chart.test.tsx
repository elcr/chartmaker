import React, { createRef } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { Album } from '@/types'
import { Chart, rowsID, titlesID } from '@/components/Chart'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, createTestNamedAlbums, fireEvent } from '../utils'


jest.mock('@/components/AlbumRow')
jest.mock('@/components/AlbumTitleGroup')


const container = new RenderContainer()


const albums = createTestNamedAlbums(100)

test.each([ 40, 42, 100 ] as const)('renders with top shape', size => {
    render(
        <Chart albums={albums}
            name={`Test top ${size} chart`}
            shape={{ tag: 'Top', size }}
            rowsX={10}
            rowsY={10}
            innerRef={ignore}
            dispatch={ignore}
            highlighted={5}/>,
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
            dispatch={ignore}
            highlighted={undefined}/>,
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
            dispatch={ignore}
            highlighted={3}/>,
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
            dispatch={ignore}
            highlighted={undefined}/>,
        container.element
    )

    expect(ref.current).toBeInstanceOf(Element)
})


test('dispatches unhighlight action on mouse leaving albums container', () => {
    const mock = jest.fn<[], [ Action ]>()

    render(
        <Chart albums={albums}
            name='Test 5x7 collage chart'
            shape={{ tag: 'Collage' }}
            rowsX={5}
            rowsY={7}
            innerRef={ignore}
            dispatch={mock}
            highlighted={undefined}/>,
        container.element
    )

    act(() => fireEvent('mouseLeave', container.element?.querySelector(`#${rowsID}`)))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UnhighlightAlbum'
    })
})


test('dispatches unhighlight action on mouse leaving titles container', () => {
    const mock = jest.fn<[], [ Action ]>()

    render(
        <Chart albums={albums}
            name='Test 5x7 collage chart'
            shape={{ tag: 'Collage' }}
            rowsX={5}
            rowsY={7}
            innerRef={ignore}
            dispatch={mock}
            highlighted={undefined}/>,
        container.element
    )

    act(() => fireEvent('mouseLeave', container.element?.querySelector(`#${titlesID}`)))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UnhighlightAlbum'
    })
})
