import { createRef, FC } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { Album, NamedAlbum } from '@/types'
import {
    AlbumRowComponentProps,
    Chart,
    rowsID,
    TitleGroupComponentProps,
    titlesID
} from '@/components/Chart'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, createTestNamedAlbums, fireEvent } from '../utils'
import { identifiedAlbumIsPlaceholder } from '@/state'


const container = new RenderContainer()


const albums = createTestNamedAlbums(100)

function isNamedAlbum(album: Album): album is NamedAlbum {
    return !identifiedAlbumIsPlaceholder(album)
}


const TestAlbumRow: FC<AlbumRowComponentProps<Album>> = ({ albums, size }) => {
    const json = JSON.stringify(albums)
    return (
        <div className='test-album-row'>
            {`Albums: ${json}`}
            {`Size: ${size}`}
        </div>
    )
}


const TestTitleGroup: FC<TitleGroupComponentProps<Album>> = ({ group }) => {
    const json = JSON.stringify(group)
    return (
        <div className='test-title-group'>
            {`Albums: ${json}`}
        </div>
    )
}


test.each([ 40, 42, 100 ] as const)('renders with top shape', size => {
    render(
        <Chart albums={albums}
            name={`Test top ${size} chart`}
            shape={{ tag: 'Top', size }}
            rowsX={10}
            rowsY={10}
            innerRef={ignore}
            dispatch={ignore}
            isNamedAlbum={isNamedAlbum}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}/>,
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
            isNamedAlbum={isNamedAlbum}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('excludes placeholder albums from titles', () => {
    const albumsWithPlaceholders: Album[] = albums.map((album, index) =>
        index % 2 == 0
            ? album
            : album.id
    )
    render(
        <Chart albums={albumsWithPlaceholders}
            name='Test chart with placeholders'
            shape={{ tag: 'Collage' }}
            rowsX={5}
            rowsY={5}
            innerRef={ignore}
            dispatch={ignore}
            isNamedAlbum={isNamedAlbum}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}/>,
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
            isNamedAlbum={isNamedAlbum}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}/>,
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
            isNamedAlbum={isNamedAlbum}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}/>,
        container.element
    )

    act(() => {
        debugger
        fireEvent('mouseLeave', container.element?.querySelector(`#${rowsID}`))
    })

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
            isNamedAlbum={isNamedAlbum}
            albumRowComponent={TestAlbumRow}
            titleGroupComponent={TestTitleGroup}/>,
        container.element
    )

    act(() => fireEvent('mouseLeave', container.element?.querySelector(`#${titlesID}`)))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UnhighlightAlbum'
    })
})
