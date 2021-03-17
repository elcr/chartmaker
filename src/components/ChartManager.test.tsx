import { render } from 'react-dom'

import { ChartManager } from '@/components/ChartManager'
import type { Chart } from '@/types'

import { RenderContainer, ignore } from '@/test-utils/utils'


jest.mock('@/components/SidebarGroup', () => require('@/components/SidebarGroup.mock'))
jest.mock('@/components/ChartSelector', () => require('@/components/ChartSelector.mock'))
jest.mock('@/components/NewChartButton', () => require('@/components/NewChartButton.mock'))
jest.mock('@/components/RenameActiveChartButton', () => require('@/components/RenameActiveChartButton.mock'))
jest.mock('@/components/DeleteActiveChartButton', () => require('@/components/DeleteActiveChartButton.mock'))
jest.mock('@/components/MoveChartButton', () => require('@/components/MoveChartButton.mock'))


const container = new RenderContainer()


const charts: Chart[] = [
    {
        name: 'test chart 1',
        shape: [ 5, 5 ],
        size: null,
        // this component doesn't touch the albums at all so no need to
        // actually pass any
        albums: []
    },
    {
        name: 'test chart 2',
        shape: [ 10, 10 ],
        size: 100,
        albums: []
    },
    {
        name: 'test chart 3',
        shape: [ 7, 7 ],
        size: 42,
        albums: []
    }
]


test.each([ 0, 1, 2 ])('renders chart selector and buttons', activeChartIndex => {
    render(
        <ChartManager dispatch={ignore}
            activeChartIndex={activeChartIndex}
            charts={charts}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
