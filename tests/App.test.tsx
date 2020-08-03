import React from 'react'
import { render } from 'react-dom'

import { State } from '@/types'
import { App } from '@/App'

import { RenderContainer } from './utils'


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
                    albums: [ ...Array(10).keys() ].map(index => ({
                        placeholder: true,
                        id: index
                    }))
                },
                {
                    name: 'Test chart 2',
                    rowsX: 3,
                    rowsY: 3,
                    shape: { tag: 'Collage' },
                    albums: [ ...Array(10).keys() ].map(index => ({
                        placeholder: true,
                        id: index + 10
                    }))
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
                albums: [ ...Array(5).keys() ].map(index => {
                    const id = index + 20
                    return {
                        placeholder: false,
                        id,
                        name: `Test album ${id}`,
                        url: `https://test.com/${id}`
                    }
                })
            },
            activeChartIndex: 1,
            albumIDCounter: 205
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
