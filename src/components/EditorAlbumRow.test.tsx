import { render } from 'react-dom'

import { EditorAlbumRow } from '@/components/EditorAlbumRow'

import { RenderContainer, ignore, createTestPlaceholderAlbums } from '@/test-utils/utils'


jest.mock('@/components/EditorChartAlbumCover')
jest.mock('@/components/AlbumRow')


const container = new RenderContainer()


test('renders album row with covers', () => {
    render(
        <EditorAlbumRow dispatch={ignore}
            albums={createTestPlaceholderAlbums(5)}
            size='5rem'
            highlighted={3}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
