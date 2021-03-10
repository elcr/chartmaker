import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { Chart } from '@/types'
import { ChartSelector, id } from '@/components/ChartSelector'
import type { Action } from '@/reducer'

import {
    RenderContainer,
    ignore,
    fireEvent
} from '@/test-utils/utils'


jest.mock('@/components/Label')
jest.mock('@/components/ControlledSelect')


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
    const mock = jest.fn<void, [ Action ]>()

    render(
        <ChartSelector dispatch={mock}
            charts={charts}
            activeChartIndex={0}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector(`#${id}`),
            { target: { value: '1' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UpdateActiveChart',
        index: 1
    })
})
