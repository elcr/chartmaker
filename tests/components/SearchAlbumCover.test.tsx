import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { NamedAlbum } from '@/types'
import { SearchAlbumCover } from '@/components/SearchAlbumCover'

import {
    RenderContainer,
    DragEventDataTransferMock,
    fireEvent
} from '../utils'


jest.mock('@/components/AlbumCover')


const container = new RenderContainer()

const album: NamedAlbum = {
    placeholder: false,
    id: 123,
    name: 'Test Album',
    url: 'https://test.com'
}


test('renders album cover', () => {
    render(
        <SearchAlbumCover album={album}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('starting drag sets event data', () => {
    render(
        <SearchAlbumCover album={album}/>,
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
    expect(mock.setDataMock).toHaveBeenCalledWith(`search-${album.id}`, '')
    expect(mock.effectAllowedMock).toHaveBeenCalledTimes(1)
    expect(mock.effectAllowedMock).toHaveBeenCalledWith('copy')
})
