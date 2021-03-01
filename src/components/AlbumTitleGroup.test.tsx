import { render } from 'react-dom'

import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'

import { RenderContainer } from '../../src/test-utils/utils'


jest.mock('@/components/AlbumTitle')


const container = new RenderContainer()


test('renders styled children', () => {
    render(
        <AlbumTitleGroup>
            Test children
        </AlbumTitleGroup>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
