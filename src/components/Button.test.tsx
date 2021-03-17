import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { Button } from '@/components/Button'

import { RenderContainer, fireEvent } from '@/test-utils/utils'


const container = new RenderContainer()


test('renders as button and click event calls onClick prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <Button id='test-id' className='test-class' title='test-title' onClick={mock}>
            Test children
        </Button>,
        container.element
    )

    expect(container.element).toMatchSnapshot()

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
})


test('click event does not call onClick prop when disabled prop passed true', () => {
    const mock = jest.fn<void, []>()

    render(
        <Button onClick={mock} disabled>
            Test children
        </Button>,
        container.element
    )

    expect(container.element).toMatchSnapshot()

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).not.toHaveBeenCalled()
})
