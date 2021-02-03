import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { Album } from '@/types'
import { EditorChartAlbumCover } from '@/components/EditorChartAlbumCover'
import type { Action } from '@/reducer'
import { getAlbumID } from '@/state'

import {
    RenderContainer,
    ignore,
    fireEvent,
    DragEventDataTransferMock
} from '../utils'


jest.mock('@/components/ChartAlbumCover')
jest.mock('@/components/RenameAlbumButton')
jest.mock('@/components/DeleteAlbumButton')


const container = new RenderContainer()

const dispatchMock = jest.fn<void, [ Action ]>()
afterEach(() => dispatchMock.mockClear())


const placeholderAlbum: Album = 123
const namedAlbum: Album = {
    id: 456,
    name: 'Test named album',
    url: 'https://test.com'
}


test('renders album cover for placeholder album', () => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
            album={placeholderAlbum}
            size='3rem'
            highlighted/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('renders album cover with overlay buttons for named album', () => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
            album={namedAlbum}
            size='5rem'
            highlighted={false}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('starting drag sets event data for named album', () => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
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


test('starting drag does nothing for placeholder album', () => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
            album={placeholderAlbum}
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

    expect(mock.setDataMock).not.toHaveBeenCalled()
    expect(mock.effectAllowedMock).not.toHaveBeenCalled()
})


test.each([
    namedAlbum,
    placeholderAlbum
])('chart album drag enter dispatches action', album => {
    render(
        <EditorChartAlbumCover dispatch={dispatchMock}
            album={album}
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
        targetID: getAlbumID(album)
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([
    [ 'search-1', namedAlbum ],
    [ 'search-1', placeholderAlbum ],
    [ 'Files', namedAlbum ],
    [ 'Files', placeholderAlbum ],
    [ 'some-other-type', namedAlbum ],
    [ 'some-other-type', placeholderAlbum ],
])('any other drag enter is ignored', (type, album) => {
    render(
        <EditorChartAlbumCover dispatch={dispatchMock}
            album={album}
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


test.each([
    namedAlbum,
    placeholderAlbum
])('dragging chart album over sets move drop effect', album => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
            album={album}
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
    [ 'search-1', namedAlbum ],
    [ 'search-1', placeholderAlbum ],
    [ 'Files', namedAlbum ],
    [ 'Files', placeholderAlbum ]
])('dragging search album or file over sets move copy effect', (type, album) => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
            album={album}
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


test.each([
    namedAlbum,
    placeholderAlbum
])('dragging anything else over does nothing', album => {
    render(
        <EditorChartAlbumCover dispatch={ignore}
            album={album}
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


test.each([
    namedAlbum,
    placeholderAlbum
])('dropping search album dispatches action', album => {
    render(
        <EditorChartAlbumCover dispatch={dispatchMock}
            album={album}
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
        sourceIndex: 1,
        targetID: getAlbumID(album)
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([
    namedAlbum,
    placeholderAlbum
])('dropping file dispatches action', album => {
    render(
        <EditorChartAlbumCover dispatch={dispatchMock}
            album={album}
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
        targetID: getAlbumID(album)
    })
    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
})


test.each([
    [ 'chart-1', namedAlbum ],
    [ 'chart-1', placeholderAlbum ],
    [ 'some-other-type', namedAlbum ],
    [ 'some-other-type', placeholderAlbum ],
])('dropping anything else does nothing', (type, album) => {
    render(
        <EditorChartAlbumCover dispatch={dispatchMock}
            album={album}
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


test.each([
    namedAlbum,
    placeholderAlbum
])('dispatches highlight event on mouse enter', album => {
    render(
        <EditorChartAlbumCover dispatch={dispatchMock}
            album={album}
            size='3rem'
            highlighted={undefined}/>,
        container.element
    )

    act(() => fireEvent('mouseEnter', container.element?.firstChild))

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'HighlightAlbum',
        targetID: getAlbumID(album)
    })
})
