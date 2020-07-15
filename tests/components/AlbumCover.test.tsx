import React, { createRef, MutableRefObject, DragEvent } from 'react'
import { render } from 'react-dom'
import { css } from 'emotion'
import { act } from 'react-dom/test-utils'

import AlbumCover from '../../src/components/AlbumCover'
import { setRenderContainer, clearRenderContainer, ignore, dragEvent } from '../utils'
import { Album, Size } from '../../src/types'


const container: MutableRefObject<HTMLElement | null> = createRef()
beforeEach(() => setRenderContainer(container))
afterEach(() => clearRenderContainer(container))

const dragMock = jest.fn<void, DragEvent<HTMLDivElement>[]>()
afterEach(jest.clearAllMocks)


const namedAlbum: Album = {
    placeholder: false,
    id: 123,
    name: 'Test album',
    url: 'https://test.com'
}
const placeholderAlbum: Album = {
    placeholder: true,
    id: 123
}


test('renders without image for placeholder album', () => {
    render(
        <AlbumCover album={placeholderAlbum}
                size={'2rem' as Size}
                onDragStart={ignore}>
            Test children
        </AlbumCover>,
        container.current
    )
    expect(container.current).toMatchSnapshot()
})


test('renders with image for named album', () => {
    render(
        <AlbumCover album={namedAlbum}
                size={'2rem' as Size}
                onDragStart={ignore}>
            Test children
        </AlbumCover>,
        container.current
    )
    expect(container.current).toMatchSnapshot()
})


test('overlayClass prop merges styles', () => {
    render(
        <AlbumCover album={placeholderAlbum}
                size={'2rem' as Size}
                onDragStart={ignore}
                overlayClass={css({ color: 'red' })}>
            Test children
        </AlbumCover>,
        container.current
    )
    expect(container.current).toMatchSnapshot()
})


test('dragstart event calls onDragStart prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size={'2rem' as Size}
                onDragStart={dragMock}>
            Test children
        </AlbumCover>,
        container.current
    )
    act(() => {
        container.current
            ?.firstChild
            ?.dispatchEvent(dragEvent('dragstart'))
    })
    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('dragenter event calls onDragEnter prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size={'2rem' as Size}
                onDragStart={ignore}
                onDragEnter={dragMock}>
            Test children
        </AlbumCover>,
        container.current
    )
    act(() => {
        container.current
            ?.firstChild
            ?.dispatchEvent(dragEvent('dragenter'))
    })
    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('dragover event calls onDragOver prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size={'2rem' as Size}
                onDragStart={ignore}
                onDragOver={dragMock}>
            Test children
        </AlbumCover>,
        container.current
    )
    act(() => {
        container.current
            ?.firstChild
            ?.dispatchEvent(dragEvent('dragover'))
    })
    expect(dragMock).toHaveBeenCalledTimes(1)
})


test('drop event calls onDrop prop', () => {
    render(
        <AlbumCover album={namedAlbum}
                size={'2rem' as Size}
                onDragStart={ignore}
                onDrop={dragMock}>
            Test children
        </AlbumCover>,
        container.current
    )
    act(() => {
        container.current
            ?.firstChild
            ?.dispatchEvent(dragEvent('drop'))
    })
    expect(dragMock).toHaveBeenCalledTimes(1)
})
