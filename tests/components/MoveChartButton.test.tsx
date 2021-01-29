import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { MoveChartButton } from '@/components/MoveChartButton'
import { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/Button')


const container = new RenderContainer()


test.each([
    [ 'Up', true ],
    [ 'Down', false ]
] as const)('renders button', (direction, disabled) => {
    render(
        <MoveChartButton dispatch={ignore} direction={direction} disabled={disabled}>
            Test
        </MoveChartButton>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ 'Up', 'Down' ] as const)('dispatches action when clicked', direction => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <MoveChartButton dispatch={mock} disabled={false} direction={direction}/>,
        container.element
    )

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'MoveActiveChart',
        direction
    })
})
