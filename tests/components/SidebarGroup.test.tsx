import { render } from 'react-dom'

import { SidebarGroup } from '@/components/SidebarGroup'

import { RenderContainer } from '../utils'


const container = new RenderContainer()


test('renders styled div', () => {
    render(
        <SidebarGroup className='test-sidebar-group'>
            Test children
        </SidebarGroup>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
