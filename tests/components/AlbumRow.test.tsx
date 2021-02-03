import { render } from 'react-dom'

import { AlbumRow } from '@/components/AlbumRow'

import { RenderContainer } from '../utils'


const container = new RenderContainer()


test('renders styled container and children', () => {
    render(
        <AlbumRow>
            Test children
        </AlbumRow>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
