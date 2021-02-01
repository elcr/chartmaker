import type { DragEvent } from 'react'
import { render } from 'react-dom'
import { css } from 'emotion'
import { act } from 'react-dom/test-utils'

import type { NamedAlbum } from '@/types'
import { AlbumCover } from '@/components/AlbumCover'

import { ignore, fireEvent, RenderContainer } from '../utils'


const container = new RenderContainer()

const dragMock = jest.fn<void, DragEvent<HTMLDivElement>[]>()
afterEach(jest.resetAllMocks)


const namedAlbum: NamedAlbum = {
    id: 123,
    name: 'Test album',
    url: 'https://test.com'
}


test('renders without image for placeholder album', () => {
    render(
        <AlbumCover size='2rem' onDragStart={ignore}>
            Test children
        </AlbumCover>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('renders with image for named album', () => {
    render(
        <AlbumCover album={namedAlbum}
                size='2rem'
                onDragStart={ignore}>
            Test children
        </AlbumCover>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('overlayClass prop merges styles', () => {
    render(
        <AlbumCover size='2rem'
                onDragStart={ignore}
                overlayClass={css({ color: 'red' })}>
            Test children
        </AlbumCover>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ true, false ])('highlighted prop merges styles when false', highlighted => {
    render(
        <AlbumCover size='2rem'
                onDragStart={ignore}
                highlighted={highlighted}>
            Test children
        </AlbumCover>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dragStart event calls onDragStart prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size='2rem'
                onDragStart={dragMock}>
            Test children
        </AlbumCover>,
        container.element
    )

    act(() => fireEvent('dragStart', container.element?.firstChild))

    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('dragEnter event calls onDragEnter prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size='2rem'
                onDragStart={ignore}
                onDragEnter={dragMock}>
            Test children
        </AlbumCover>,
        container.element
    )

    act(() => fireEvent('dragEnter', container.element?.firstChild))

    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('dragOver event calls onDragOver prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size='2rem'
                onDragStart={ignore}
                onDragOver={dragMock}>
            Test children
        </AlbumCover>,
        container.element
    )

    act(() => fireEvent('dragOver', container.element?.firstChild))

    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('drop event calls onDrop prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size='2rem'
                onDragStart={ignore}
                onDrop={dragMock}>
            Test children
        </AlbumCover>,
        container.element
    )

    act(() => fireEvent('drop', container.element?.firstChild))

    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('mouseEnter event calls onMouseEnter prop', () => {
    const mouseEnterMock = jest.fn<void, []>()

    render(
        <AlbumCover album={namedAlbum}
                size='2rem'
                onDragStart={ignore}
                onMouseEnter={mouseEnterMock}>
            Test children
        </AlbumCover>,
        container.element
    )

    act(() => fireEvent('mouseEnter', container.element?.firstChild))

    expect(mouseEnterMock).toHaveBeenCalledTimes(1)
})
