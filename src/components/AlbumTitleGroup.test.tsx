import { render } from 'react-dom'

import { AlbumTitleGroup } from '@/components/AlbumTitleGroup'

import { RenderContainer } from '@/test-utils/utils'


jest.mock('@/components/AlbumTitle', () => require('@/components/AlbumTitle.mock'))


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
