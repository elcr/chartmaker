import React, { createRef, FC } from 'react'
import { render } from 'react-dom'

import { Album } from '@/types'
import { Chart } from '@/components/Chart'
import { AlbumRowProps } from '@/components/AlbumRow'

import { RenderContainer, ignore } from '../utils'


const container = new RenderContainer()


const TestAlbumRow: FC<AlbumRowProps> = ({ albums, size }) => {
    const json = JSON.stringify(albums)
    return (
        <div className='test-album-row'>
            {`Albums: ${json}`}
            {`Size: ${size}`}
        </div>
    )
}


const TestTitleGroup: FC = ({ children }) =>
    <div className='test-title-group'>
        {children}
    </div>


const albums: Album[] = [...Array(100).keys()].map(index => ({
    placeholder: false,
    id: index,
    name: `Test album ${index}`,
    url: `https://test.com/${index}`
}))


test.each([ 40, 42, 100 ] as const)('renders with top shape', size => {
    render(
        <Chart albums={albums}
            name={`Test top ${size} chart`}
            shape={{ tag: 'Top', size }}
            rowsX={10}
            rowsY={10}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}
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
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}
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
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}
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
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}
            innerRef={ref}
            dispatch={ignore}/>,
        container.element
    )

    expect(ref.current).toBeInstanceOf(Element)
})
