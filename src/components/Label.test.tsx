import { render } from 'react-dom'

import { Label } from '@/components/Label'

import { RenderContainer } from '@/test-utils/utils'


const container = new RenderContainer()


test('renders label', () => {
    render(
        <Label target='test-target'>
            Test children
        </Label>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
