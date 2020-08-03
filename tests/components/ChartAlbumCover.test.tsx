import React, { FC } from 'react'
import { render } from 'react-dom'
import { cx } from 'emotion'
import { act } from 'react-dom/test-utils'

import { Album, Size } from '@/types'
import { ChartAlbumCover, ChartAlbumCoverProps } from '@/components/ChartAlbumCover'
import { AlbumCoverProps } from '@/components/AlbumCover'

import {
    RenderContainer,
    ignore,
    fireEvent,
    DragEventDataTransferMock
} from '../utils'


const container = new RenderContainer()


const TestAlbumCover: FC<AlbumCoverProps> = ({
    album,
    size,
    overlayClass,
    children,
    ...props
}) => {
    const json = JSON.stringify(album)
    const className = cx('test-album-cover', overlayClass)
    return (
        <div {...props} className={className}>
            {`Album: ${json}`}
            {`Size: ${size}`}
            {children}
        </div>
    )
}


const placeholderAlbum: Album = {
    placeholder: true,
    id: 123
}

const namedAlbum: Album = {
    placeholder: false,
    id: 456,
    name: 'Test named album',
    url: 'https://test.com'
}


// delete the semicolon and watch as vscode's syntax highlighting dies
type ActionParams = Parameters<ChartAlbumCoverProps['dispatch']>;


test('renders album cover for placeholder album', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={placeholderAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('renders album cover with overlay buttons for named album', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('clicking rename button dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartAlbumCover dispatch={mock}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    act(() => {
        const button = container.element?.querySelector('button[title="Rename"]')
        fireEvent('click', button)
    })

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'PromptToRenameAlbum',
        id: namedAlbum.id
    })
})


test('clicking delete button dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartAlbumCover dispatch={mock}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    act(() => {
        const button = container.element?.querySelector('button[title="Delete"]')
        fireEvent('click', button)
    })

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'DeleteAlbum',
        id: namedAlbum.id
    })
})


test('starting drag sets event data', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const mock = new DragEventDataTransferMock()

    act(() =>
        fireEvent(
            'dragStart',
            container.element?.firstChild,
            { dataTransfer: mock }
        )
    )

    expect(mock.setDataMock).toHaveBeenCalledTimes(1)
    expect(mock.setDataMock).toHaveBeenCalledWith(`chart-${namedAlbum.id}`, '')
    expect(mock.effectAllowedMock).toHaveBeenCalledTimes(1)
    expect(mock.effectAllowedMock).toHaveBeenCalledWith('copyMove')
})


test('chart album drag enter dispatches action', () => {
    const dispatchMock = jest.fn<void, ActionParams>()

    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ 'chart-1' ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() => {
        fireEvent(
            'dragEnter',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    })

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
        tag: 'DragChartAlbum',
        sourceID: 1,
        targetID: namedAlbum.id
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([ 'search-1', 'some-other-type' ])('any other drag enter is ignored', type => {
    const dispatchMock = jest.fn<void, ActionParams>()

    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ type ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() => {
        fireEvent(
            'dragEnter',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    })

    expect(dispatchMock).toHaveBeenCalledTimes(0)
    expect(preventDefaultMock).toHaveBeenCalledTimes(0)
})


test('dragging chart album over sets move drop effect', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ 'chart-1' ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() =>
        fireEvent(
            'dragOver',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    )

    expect(dataTransferMock.dropEffectMock).toHaveBeenCalledTimes(1)
    expect(dataTransferMock.dropEffectMock).toHaveBeenCalledWith('move')
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test('dragging search album over sets move copy effect', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ 'search-1' ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() =>
        fireEvent(
            'dragOver',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    )

    expect(dataTransferMock.dropEffectMock).toHaveBeenCalledTimes(1)
    expect(dataTransferMock.dropEffectMock).toHaveBeenCalledWith('copy')
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test('dragging anything else over does nothing', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ 'some-other-type' ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() =>
        fireEvent(
            'dragOver',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    )

    expect(dataTransferMock.dropEffectMock).toHaveBeenCalledTimes(0)
    expect(preventDefaultMock).toHaveBeenCalledTimes(0)
})


test('dropping search album dispatches action', () => {
    const dispatchMock = jest.fn<void, ActionParams>()

    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ 'search-1' ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() => {
        fireEvent(
            'drop',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    })

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
        tag: 'DropSearchAlbum',
        sourceID: 1,
        targetID: namedAlbum.id
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([ 'chart-1', 'some-other-type' ])('dropping anything else does nothing', type => {
    const dispatchMock = jest.fn<void, ActionParams>()

    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size={'3rem' as Size}
            albumCoverComponent={TestAlbumCover}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ type ])
    const preventDefaultMock = jest.fn<void, []>()

    act(() => {
        fireEvent(
            'drop',
            container.element?.firstChild,
            {
                dataTransfer: dataTransferMock,
                preventDefault: preventDefaultMock
            }
        )
    })

    expect(dispatchMock).toHaveBeenCalledTimes(0)
    expect(preventDefaultMock).toHaveBeenCalledTimes(0)
})
