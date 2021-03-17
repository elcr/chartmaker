import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ChartAlbumCover } from '@/components/ChartAlbumCover'

import { fireEvent, RenderContainer } from '@/test-utils/utils'
import type { Album } from '@/types'
import type { Action } from '@/reducer'
import { getAlbumID } from '@/utils'


jest.mock('@/components/AlbumCover', () => require('@/components/AlbumCover.mock'))


const container = new RenderContainer()


test.each<[ Album, string, number | null ]>([
    [ { id: 1, name: 'Test album', url: 'http://test.com' }, 'Test size', 1 ],
    [ { id: 2, name: 'Test album 2', url: 'http://test2.com' }, 'Test size 2', 3 ],
    [ 1, 'Test size 3', 1 ],
    [ 1, 'Test size 4', 2 ],
])('renders album cover and dispatches action on mouse enter', (album, size, highlighted) => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <ChartAlbumCover dispatch={mock}
                album={album}
                size={size}
                highlighted={highlighted}>
            Test children
        </ChartAlbumCover>,
        container.element
    )

    expect(container.element).toMatchSnapshot()

    act(() => fireEvent('mouseEnter', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'HighlightAlbum',
        targetID: getAlbumID(album)
    })
})
