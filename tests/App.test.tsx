import { render } from 'react-dom'

import type { State } from '@/types'
import { App } from '@/App'
import { STATE_VERSION } from '@/constants'

import { RenderContainer, createTestPlaceholderAlbums, createTestNamedAlbums } from './utils'


jest.mock('@/components/EditorSidebar')
jest.mock('@/components/EditorChart')


const localStorageMock = jest.spyOn(Storage.prototype, 'getItem')
    .mockImplementation(() => {
        const state: State = {
            version: STATE_VERSION,
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
            highlightedID: 5
        }
        return JSON.stringify(state)
    })
afterEach(() => localStorageMock.mockReset())


const container = new RenderContainer()


test('renders sidebar and editor chart', () => {
    render(
        <App/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
