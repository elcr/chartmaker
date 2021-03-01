import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ControlledSlider } from '@/components/ControlledSlider'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/Label')


const container = new RenderContainer()


test.each([ true, false, undefined ])('renders labelled slider', disabled => {
    render(
        <ControlledSlider id='test-slider'
                min={1}
                max={3}
                step={1}
                value={1}
                disabled={disabled}
                onChange={ignore}>
            Test children
        </ControlledSlider>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('change event calls onChange prop', () => {
    const mock = jest.fn<void, [ number ]>()

    render(
        <ControlledSlider id='test-slider'
                min={1}
                max={3}
                step={1}
                value={1}
                disabled={false}
                onChange={mock}>
            Test children
        </ControlledSlider>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('input'),
            { target: { value: '2' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(2)
})
