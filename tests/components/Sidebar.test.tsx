import React from 'react'
import { render } from 'react-dom'

import { SearchState, Chart } from '@/types'
import { Sidebar } from '@/components/Sidebar'

import { RenderContainer, ignore, createTestNamedAlbums } from '../utils'


jest.mock('@/components/ChartManager')
jest.mock('@/components/ImportExportScreenshotButtons')
jest.mock('@/components/ChartShapeControls')
jest.mock('@/components/APIKeyInput')
jest.mock('@/components/SearchBox')
jest.mock('@/components/SearchResults')


const container = new RenderContainer()


test.each<SearchState>([
    {
        tag: 'Waiting',
        query: 'Test query'
    },
    {
        tag: 'Loading',
        query: 'Test query',
        // does not affect rendering in any way so can be left out
        controller: undefined as any
    },
    {
        tag: 'Error',
        query: 'Test query',
        message: 'Test error'
    },
    {
        tag: 'Complete',
        query: 'Test query',
        albums: []
    },
    {
        tag: 'Complete',
        query: 'Test query',
        albums: createTestNamedAlbums(5)
    },
])('renders groups with no search results unless complete and album present', searchState => {
    const charts: Chart[] = [
        {
            name: 'Test chart 1',
            rowsX: 10,
            rowsY: 10,
            shape: { tag: 'Top', size: 40 },
            // chart albums don't affect rendering so can be left out
            albums: []
        },
        {
            name: 'Test chart 2',
            rowsX: 3,
            rowsY: 7,
            shape: { tag: 'Collage' },
            albums: []
        },
    ]

    render(
        <Sidebar dispatch={ignore}
            charts={charts}
            activeChartIndex={1}
            apiKey='Test api key'
            searchState={searchState}
            screenshotState={{ loading: false, scale: 2 }}
            chartRef={{ current: null }}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
