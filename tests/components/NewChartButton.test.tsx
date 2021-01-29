import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { NewChartButton } from '@/components/NewChartButton'
import { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/Button')


const container = new RenderContainer()


test('renders button', () => {
    render(
        <NewChartButton dispatch={ignore}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dispatches action when clicked', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <NewChartButton dispatch={mock}/>,
        container.element
    )

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'PromptForNewChart'
    })
})
