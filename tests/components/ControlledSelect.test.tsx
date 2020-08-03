import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ControlledSelect } from '@/components/ControlledSelect'

import { RenderContainer, ignore, fireEvent } from '../utils'


const container = new RenderContainer()


test('renders select', () => {
    render(
        <ControlledSelect id='test-select'
                value={1}
                onChange={ignore}>
            Test children
        </ControlledSelect>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('change event calls onChange prop', () => {
    const mock = jest.fn<void, [ number ]>()

    render(
        <ControlledSelect id='test-select'
                value={1}
                onChange={mock}>
            Test children
        </ControlledSelect>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('select'),
            { target: { value: '2' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(2)
})
