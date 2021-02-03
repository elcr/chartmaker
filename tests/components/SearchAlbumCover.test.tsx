import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { UnidentifiedNamedAlbum } from '@/types'
import { SearchAlbumCover } from '@/components/SearchAlbumCover'

import {
    RenderContainer,
    DragEventDataTransferMock,
    fireEvent
} from '../utils'


jest.mock('@/components/AlbumCover')


const container = new RenderContainer()

const album: UnidentifiedNamedAlbum = {
    name: 'Test Album',
    url: 'https://test.com'
}


test('renders album cover', () => {
    render(
        <SearchAlbumCover album={album} index={1}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ 1, 2 ])('starting drag sets event data', index => {
    render(
        <SearchAlbumCover album={album} index={index}/>,
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
    expect(mock.setDataMock).toHaveBeenCalledWith(`search-${index}`, '')
    expect(mock.effectAllowedMock).toHaveBeenCalledTimes(1)
    expect(mock.effectAllowedMock).toHaveBeenCalledWith('copy')
})
