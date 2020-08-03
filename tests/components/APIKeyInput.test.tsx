import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ActionWithTag } from '@/reducer'
import { APIKeyInput, id } from '@/components/APIKeyInput'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/SidebarGroup')
jest.mock('@/components/Label')
jest.mock('@/components/ControlledInput')


const container = new RenderContainer()


test('renders labelled input', () => {
    render(
        <APIKeyInput dispatch={ignore} apiKey='test api key'/>,
        container.element
    )
    expect(container.element).toMatchSnapshot()
})


test('dispatches action on input change', () => {
    const mock = jest.fn<void, [ ActionWithTag<'UpdateAPIKey'> ]>()
    render(
        <APIKeyInput dispatch={mock} apiKey='test api key'/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector(`#${id}`),
            { target: { value: 'test new api key' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ ActionWithTag<'UpdateAPIKey'> ]>({
        tag: 'UpdateAPIKey',
        apiKey: 'test new api key'
    })
})
