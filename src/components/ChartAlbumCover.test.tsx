import { render } from 'react-dom'

import { ChartAlbumCover } from '@/components/ChartAlbumCover'

import { RenderContainer } from '@/test-utils/utils'
import type { UnidentifiedAlbum } from '@/types'


jest.mock('@/components/AlbumCover')


const container = new RenderContainer()


test.each<[ UnidentifiedAlbum, string, boolean | undefined ]>([
    [ { name: 'Test album', url: 'http://test.com' }, 'Test size', true ],
    [ { name: 'Test album 2', url: 'http://test2.com' }, 'Test size 2', false ],
    [ null, 'Test size 3', undefined ],
])('renders album cover', (album, size, highlighted) => {
    render(
        <ChartAlbumCover album={album} size={size} highlighted={highlighted}>
            Test children
        </ChartAlbumCover>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
