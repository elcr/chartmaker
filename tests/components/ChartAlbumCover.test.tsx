import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { Album } from '@/types'
import { ChartAlbumCover } from '@/components/ChartAlbumCover'
import type { Action } from '@/reducer'

import {
    RenderContainer,
    ignore,
    fireEvent,
    DragEventDataTransferMock
} from '../utils'


jest.mock('@/components/AlbumCover')
jest.mock('@/components/RenameAlbumButton')
jest.mock('@/components/DeleteAlbumButton')


const container = new RenderContainer()

const dispatchMock = jest.fn<void, [ Action ]>()
afterEach(() => dispatchMock.mockClear())


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


test('renders album cover for placeholder album', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={placeholderAlbum}
            size='3rem'
            highlighted/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('renders album cover with overlay buttons for named album', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size='3rem'
            highlighted={false}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('starting drag sets event data', () => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
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
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
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
    expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'DragChartAlbum',
        sourceID: 1,
        targetID: namedAlbum.id
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([
    'search-1',
    'Files',
    'some-other-type'
])('any other drag enter is ignored', type => {
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
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
            size='3rem'
            highlighted={undefined}/>,
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


test.each([
    'search-1',
    'Files'
])('dragging search album or file over sets move copy effect', type => {
    render(
        <ChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
        container.element
    )

    const dataTransferMock = new DragEventDataTransferMock([ type ])
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
            size='3rem'
            highlighted={undefined}/>,
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
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
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
    expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'DropSearchAlbum',
        sourceID: 1,
        targetID: namedAlbum.id
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test('dropping file dispatches action', () => {
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
        container.element
    )

    const file: File = 'Test file' as any
    const dataTransferMock = new DragEventDataTransferMock(
        [ 'Files' ],
        [ file ]
    )
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
    expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'DropExternalFile',
        file,
        targetID: namedAlbum.id
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([ 'chart-1', 'some-other-type' ])('dropping anything else does nothing', type => {
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
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


test('dispatches highlight event on mouse enter', () => {
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={namedAlbum}
            size='3rem'
            highlighted={undefined}/>,
        container.element
    )

    act(() => fireEvent('mouseEnter', container.element?.firstChild))

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'HighlightAlbum',
        targetID: namedAlbum.id
    })
})


test('does not dispatch on placeholder mouse enter', () => {
    render(
        <ChartAlbumCover dispatch={dispatchMock}
            album={placeholderAlbum}
            size='3rem'
            highlighted={undefined}/>,
        container.element
    )

    act(() => fireEvent('mouseEnter', container.element?.firstChild))

    expect(dispatchMock).not.toHaveBeenCalled()
})
