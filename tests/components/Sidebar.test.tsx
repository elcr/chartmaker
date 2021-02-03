import { render } from 'react-dom'

import { Sidebar } from '@/components/Sidebar'

import { RenderContainer } from '../utils'


const container = new RenderContainer()


test('renders styled aside', () => {
    render(
        <Sidebar>
            Test children
        </Sidebar>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
