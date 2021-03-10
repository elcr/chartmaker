import { render } from 'react-dom'

import { EditorAlbumTitleGroup } from '@/components/EditorAlbumTitleGroup'

import { RenderContainer, ignore, createTestNamedAlbums } from '@/test-utils/utils'


jest.mock('@/components/EditorAlbumTitle')
jest.mock('@/components/AlbumTitleGroup')


const container = new RenderContainer()


test.each([ 123, undefined ])('renders group with titles', highlighted => {
    render(
        <EditorAlbumTitleGroup dispatch={ignore}
            group={createTestNamedAlbums(3)}
            highlighted={highlighted}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
