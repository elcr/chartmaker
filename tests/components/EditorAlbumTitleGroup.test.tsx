import { render } from 'react-dom'

import { EditorAlbumTitleGroup } from '@/components/EditorAlbumTitleGroup'

import { RenderContainer, ignore, createTestNamedAlbums } from '../utils'


jest.mock('@/components/EditorAlbumTitle')
jest.mock('@/components/AlbumTitleGroup')


const container = new RenderContainer()


test.each([ 123, undefined ])('renders group with titles', highlighted => {
    render(
        <EditorAlbumTitleGroup dispatch={ignore}
            albums={createTestNamedAlbums(3)}
            highlighted={highlighted}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
