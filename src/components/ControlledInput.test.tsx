import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ControlledInput } from '@/components/ControlledInput'

import { RenderContainer, ignore, fireEvent } from '@/test-utils/utils'


const container = new RenderContainer()


test.each([ 'search', 'password' ] as const)('renders text type input', type => {
    render(
        <ControlledInput type={type}
            id='test-input'
            value='test value'
            onChange={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ true, false, undefined ])('renders disabled prop', disabled => {
    render(
        <ControlledInput id='test-input'
            type='search'
            value='test value'
            disabled={disabled}
            onChange={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('change event calls onChange prop', () => {
    const mock = jest.fn<void, [ string ]>()

    render(
        <ControlledInput id='test-input'
            type='search'
            value='test value'
            onChange={mock}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('input'),
            { target: { value: 'new value' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith('new value')
})
