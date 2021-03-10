import { render } from 'react-dom'

import { EditorAlbumTitle } from '@/components/EditorAlbumTitle'
import type { NamedAlbum } from '@/types'

import { RenderContainer, ignore } from '@/test-utils/utils'


jest.mock('@/components/AlbumTitle')
jest.mock('@/components/RenameAlbumButton')
jest.mock('@/components/DeleteAlbumButton')


const container = new RenderContainer()


test.each([ undefined, 123, 456 ])('renders title and buttons', highlighted => {
    const album: NamedAlbum = {
        id: 123,
        name: 'Test album',
        url: 'http://test.com'
    }
    render(
        <EditorAlbumTitle dispatch={ignore} album={album} highlighted={highlighted}>
            Test children
        </EditorAlbumTitle>,
        container.element
    )
    expect(container.element).toMatchSnapshot()
})
