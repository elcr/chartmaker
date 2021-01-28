import React from 'react'
import { render } from 'react-dom'

import { State } from '@/types'
import { App } from '@/App'

import { RenderContainer, createTestPlaceholderAlbums, createTestNamedAlbums } from './utils'


jest.mock('@/components/Sidebar')
jest.mock('@/components/Chart')


const localStorageMock = jest.spyOn(Storage.prototype, 'getItem')
    .mockImplementation(() => {
        const state: State = {
            charts: [
                {
                    name: 'Test chart 1',
                    rowsX: 10,
                    rowsY: 10,
                    shape: { tag: 'Top', size: 40 },
                    albums: createTestPlaceholderAlbums(10)
                },
                {
                    name: 'Test chart 2',
                    rowsX: 3,
                    rowsY: 3,
                    shape: { tag: 'Collage' },
                    albums: createTestPlaceholderAlbums(10, 10)
                }
            ],
            apiKey: 'Test api key',
            screenshot: {
                loading: false,
                scale: 2
            },
            search: {
                tag: 'Complete',
                query: 'Test search query',
                albums: createTestNamedAlbums(5, 20)
            },
            activeChartIndex: 1,
            albumIDCounter: 25,
            highlightedID: 5
        }
        return JSON.stringify(state)
    })
afterEach(() => localStorageMock.mockReset())


const container = new RenderContainer()


test('renders sidebar and chart', () => {
    render(
        <App/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
