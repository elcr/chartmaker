import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import AlbumActionButton from '../../src/components/AlbumActionButton'
import { ignore, fireEvent, RenderContainer } from '../test-utils'


const container = new RenderContainer()


test('renders as button', () => {
    render(
        <AlbumActionButton title='Test title' onClick={ignore}>
            Test children
        </AlbumActionButton>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('click event calls onClick prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <AlbumActionButton title='Test title' onClick={mock}>
            Test children
        </AlbumActionButton>,
        container.element
    )

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
})
