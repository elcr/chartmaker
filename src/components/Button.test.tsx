import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { Button } from '@/components/Button'

import { RenderContainer, fireEvent } from '@/test-utils/utils'


const container = new RenderContainer()


test('renders as button', () => {
    render(
        <Button id='test-id' className='test-class' disabled>
            Test children
        </Button>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('click event calls onClick prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <Button onClick={mock}>
            Test children
        </Button>,
        container.element
    )

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
})
