import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { DeleteActiveChartButton } from '@/components/DeleteActiveChartButton'
import { ActionWithTag } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/Button')


const container = new RenderContainer()


test('renders button', () => {
    render(
        <DeleteActiveChartButton dispatch={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dispatches action when clicked', () => {
    const mock = jest.fn<void, [ ActionWithTag<'PromptToDeleteActiveChart'> ]>()

    render(
        <DeleteActiveChartButton dispatch={mock}/>,
        container.element
    )

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ ActionWithTag<'PromptToDeleteActiveChart'> ]>({
        tag: 'PromptToDeleteActiveChart'
    })
})
