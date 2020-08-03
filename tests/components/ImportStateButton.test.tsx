import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ImportStateButton } from '@/components/ImportStateButton'
import { ActionWithTag } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/Button')


const container = new RenderContainer()


test('renders button and hidden file input', () => {
    render(
        <ImportStateButton dispatch={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('clicking button actually clicks input', () => {
    render(
        <ImportStateButton dispatch={ignore}/>,
        container.element
    )

    let clicked = false

    act(() => {
        container.element?.firstChild?.addEventListener('click', () => clicked = true)
        fireEvent('click', container.element?.children?.[1])
    })

    expect(clicked).toBe(true)
})


test('dispatches action when input changed and file selected', () => {
    const mock = jest.fn<void, [ ActionWithTag<'ImportStateFile'> ]>()

    render(
        <ImportStateButton dispatch={mock}/>,
        container.element
    )

    const fakeFile = 'hello' as any as File

    act(() =>
        fireEvent(
            'change',
            container.element?.firstChild,
            { target: { files: [ fakeFile ] } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ ActionWithTag<'ImportStateFile'> ]>({
        tag: 'ImportStateFile',
        file: fakeFile
    })
})


test('does nothing when input changed but no file selected', () => {
    const mock = jest.fn<void, [ ActionWithTag<'ImportStateFile'> ]>()

    render(
        <ImportStateButton dispatch={mock}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.firstChild,
            { target: { files: [] } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(0)
})
