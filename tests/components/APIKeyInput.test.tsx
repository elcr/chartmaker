import React, { createRef, MutableRefObject } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { setRenderContainer, clearRenderContainer, ignore, fireEvent } from '../utils'
import APIKeyInput from '../../src/components/APIKeyInput'
import { Action } from '../../src/reducer'


const container: MutableRefObject<HTMLElement | null> = createRef()
beforeEach(() => setRenderContainer(container))
afterEach(() => clearRenderContainer(container))


// this line breaks vscode's highlights despite being syntactically correct. gg
type UpdateAPIKeyAction = Extract<Action, { tag: 'UpdateAPIKey' }>


test('renders labelled input', () => {
    render(
        <APIKeyInput dispatch={ignore} apiKey='test api key'/>,
        container.current
    )
    expect(container.current).toMatchSnapshot()
})


test('dispatches action on input change', () => {
    const mock = jest.fn<void, [ UpdateAPIKeyAction ]>()
    render(
        <APIKeyInput dispatch={mock} apiKey='test api key'/>,
        container.current
    )

    act(() => {
        const input = container.current?.querySelector('input')
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
