import { render } from 'react-dom'

import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'

import { RenderContainer, createTestNamedAlbums, ignore } from '../utils'


jest.mock('@/components/AlbumTitle')


const container = new RenderContainer()


test('renders album titles', () => {
    const albums = createTestNamedAlbums(3)

    render(
        <AlbumTitleGroup dispatch={ignore} albums={albums} highlighted={2}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
