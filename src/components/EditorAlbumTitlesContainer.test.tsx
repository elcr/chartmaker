import { render } from 'react-dom'

import type { NamedAlbum } from '@/types'
import { EditorAlbumTitles } from '@/components/EditorAlbumTitles'

import { createTestNamedAlbums, ignore, RenderContainer } from '@/test-utils/utils'


jest.mock('@/components/EditorAlbumTitleGroup')
jest.mock('@/components/AlbumTitlesContainer')


const container = new RenderContainer()


test.each<[ NamedAlbum[][], number | undefined ]>([
    [
        [
            createTestNamedAlbums(2),
            createTestNamedAlbums(3, 3),
            createTestNamedAlbums(2, 6)
        ],
        1
    ],
    [
        [
            createTestNamedAlbums(5),
            createTestNamedAlbums(3, 6)
        ],
        undefined
    ],
])('renders container and rows', (groups, highlighted) => {
    render(
        <EditorAlbumTitles dispatch={ignore}
            groups={groups}
            highlighted={highlighted}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
