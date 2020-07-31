import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { Action } from '@/reducer'
import APIKeyInput from '@/components/APIKeyInput'

import { RenderContainer, ignore, fireEvent } from '../utils'


const container = new RenderContainer()


// this line breaks vscode's highlights despite being syntactically correct. gg
type UpdateAPIKeyAction = Extract<Action, { tag: 'UpdateAPIKey' }>


test('renders labelled input', () => {
    render(
        <APIKeyInput dispatch={ignore} apiKey='test api key'/>,
        container.element
    )
    expect(container.element).toMatchSnapshot()
})


test('dispatches action on input change', () => {
    const mock = jest.fn<void, [ UpdateAPIKeyAction ]>()
    render(
        <APIKeyInput dispatch={mock} apiKey='test api key'/>,
        container.element
    )

    act(() => {
        const input = container.element?.querySelector('input')
        if (input == null) {
            return
        }
        input.value = 'test new api key'
        fireEvent('change', input)
    })

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ UpdateAPIKeyAction ]>({
        tag: 'UpdateAPIKey',
        apiKey: 'test new api key'
    })
})
