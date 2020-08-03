import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { Chart } from '@/types'
import { ChartSelector, ChartSelectorProps } from '@/components/ChartSelector'

import {
    RenderContainer,
    ignore,
    fireEvent
} from '../utils'


const container = new RenderContainer()

const charts: Chart[] = [
    {
        name: 'test chart 1',
        rowsX: 5,
        rowsY: 5,
        shape: { tag: 'Collage' },
        // this component doesn't touch the albums at all so no need to
        // actually pass any
        albums: []
    },
    {
        name: 'test chart 2',
        rowsX: 10,
        rowsY: 10,
        shape: { tag: 'Top', size: 100 },
        albums: []
    },
    {
        name: 'test chart 3',
        rowsX: 10,
        rowsY: 10,
        shape: { tag: 'Top', size: 42 },
        albums: []
    }
]


type ActionParams = Parameters<ChartSelectorProps['dispatch']>;


test('renders labelled select', () => {
    render(
        <ChartSelector dispatch={ignore}
            charts={charts}
            activeChartIndex={1}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('changing selected chart dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartSelector dispatch={mock}
            charts={charts}
            activeChartIndex={0}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('select'),
            { target: { value: '1' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'UpdateActiveChart',
        index: 1
    })
})
