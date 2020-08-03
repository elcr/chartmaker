import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ControlledForm } from '@/components/ControlledForm'

import { RenderContainer, ignore, fireEvent } from '../utils'


const container = new RenderContainer()


test('renders form', () => {
    render(
        <ControlledForm onSubmit={ignore}>
            test form
        </ControlledForm>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('submit calls onSubmit prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <ControlledForm onSubmit={mock}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'submit',
            container.element?.querySelector('form')
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
})
