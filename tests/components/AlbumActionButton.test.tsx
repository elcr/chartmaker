import React, { createRef, MutableRefObject } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import AlbumActionButton from '../../src/components/AlbumActionButton'
import { setRenderContainer, clearRenderContainer, ignore, fireEvent } from '../utils'


const container: MutableRefObject<HTMLElement | null> = createRef()
beforeEach(() => setRenderContainer(container))
afterEach(() => clearRenderContainer(container))


test('renders as button', () => {
    render(
        <AlbumActionButton title='Test title' onClick={ignore}>
            Test label
        </AlbumActionButton>,
        container.current
    )
    expect(container.current).toMatchSnapshot()
})


test('click event calls onClick prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <AlbumActionButton title='Test title' onClick={mock}>
            Test label
        </AlbumActionButton>,
        container.current
    )

    act(() => fireEvent('click', container.current?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
})
