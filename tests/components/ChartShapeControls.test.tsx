import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import {
    RenderContainer,
    ignore,
    fireEvent,
} from '../utils'
import { ChartShapeControls, ChartShapeControlsProps } from '@/components/ChartShapeControls'


jest.mock('@/components/SidebarGroup')
jest.mock('@/components/ControlledRadioButton')
jest.mock('@/components/ControlledSlider')


const container = new RenderContainer()


type ActionParams = Parameters<ChartShapeControlsProps['dispatch']>;


test.each([ 40, 42, 100 ] as const)('top shape renders radio buttons', size => {
    render(
        <ChartShapeControls dispatch={ignore}
            rowsX={10}
            rowsY={10}
            shape={{ tag: 'Top', size }}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('collage shape renders radio buttons and sliders', () => {
    render(
        <ChartShapeControls dispatch={ignore}
            rowsX={10}
            rowsY={10}
            shape={{ tag: 'Collage' }}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ 40, 42, 100 ] as const)('checking top radio buttons dispatches action', size => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartShapeControls dispatch={mock}
            rowsX={5}
            rowsY={5}
            shape={{ tag: 'Collage' }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector(`#top${size}`)
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'UpdateChartShape',
        shape: { tag: 'Top', size },
        rowsX: 5,
        rowsY: 5
    })
})


test('checking collage radio button dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartShapeControls dispatch={mock}
            rowsX={5}
            rowsY={5}
            shape={{ tag: 'Top', size: 100 }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('#collage')
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'UpdateChartShape',
        shape: { tag: 'Collage' },
        rowsX: 5,
        rowsY: 5
    })
})


test('moving collage x slider dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartShapeControls dispatch={mock}
            rowsX={5}
            rowsY={5}
            shape={{ tag: 'Collage' }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('#rows-x'),
            { target: { value: '6' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'UpdateChartShape',
        shape: { tag: 'Collage' },
        rowsX: 6,
        rowsY: 5
    })
})


test('moving collage y slider dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

    render(
        <ChartShapeControls dispatch={mock}
            rowsX={5}
            rowsY={5}
            shape={{ tag: 'Collage' }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('#rows-y'),
            { target: { value: '4' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'UpdateChartShape',
        shape: { tag: 'Collage' },
        rowsX: 5,
        rowsY: 4
    })
})
