import React, { createRef, MutableRefObject } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Button from '../../src/components/Button'
import { setRenderContainer, clearRenderContainer, fireEvent } from '../utils'


const container: MutableRefObject<HTMLElement | null> = createRef()
beforeEach(() => setRenderContainer(container))
afterEach(() => clearRenderContainer(container))


test('renders as button', () => {
    render(
        <Button className='test-class' disabled>
            Test children
        </Button>,
        container.current
    )

    expect(container.current).toMatchSnapshot()
})


test('click event calls onClick prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <Button onClick={mock}>
            Test children
        </Button>,
        container.current
    )

    act(() => fireEvent('click', container.current?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
})
