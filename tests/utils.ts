import { unmountComponentAtNode } from 'react-dom'
import { Simulate } from 'react-dom/test-utils'

import type { NamedAlbum, State, Chart } from '@/types'
import { STATE_VERSION } from '@/constants'


export function fireEvent(
    type: keyof typeof Simulate,
    element: Element | ChildNode | null | undefined,
    eventData?: any
) {
    if (element == null) {
        throw new Error('element not found')
    }
    Simulate[type](element as Element, eventData)
}


export function ignore() {}


export class DragEventDataTransferMock {
    public readonly setDataMock = jest.fn<void, [ string, string ]>()
    public readonly effectAllowedMock = jest.fn<void, [ string ]>()
    public readonly dropEffectMock = jest.fn<void, [ string ]>()
    public readonly types: ReadonlyArray<string>
    public readonly files: ReadonlyArray<File>

    public constructor(types: ReadonlyArray<string> = [], files: ReadonlyArray<File> = []) {
        this.types = types
        this.files = files
    }

    public setData(key: string, value: string) {
        this.setDataMock(key, value)
    }

    public set effectAllowed(value: string) {
        this.effectAllowedMock(value)
    }

    public set dropEffect(value: string) {
        this.dropEffectMock(value)
    }
}


export class RenderContainer {
    public element: HTMLElement | null = null

    public constructor() {
        beforeEach(() => this.create())
        afterEach(() => this.remove())
    }

    private create() {
        this.element = document.createElement('div')
        this.element.id = 'test-render-container'
        document.body.appendChild(this.element)
    }

    private remove() {
        if (this.element === null) {
            return
        }
        unmountComponentAtNode(this.element)
        this.element.remove()
        this.element = null
    }
}


export function createTestNamedAlbums(count: number, start = 1): NamedAlbum[] {
    const albums: NamedAlbum[] = []
    for (let index = start; index < count + 1; index++) {
        albums.push({
            id: index,
            name: `Test album ${index}`,
            url: `https://test.com/${index}`
        })
    }
    return albums
}


export function createTestPlaceholderAlbums(count: number, startID = 1): number[] {
    const albums: number[] = []
    for (let index = 0; index < count; index++) {
        albums.push(index + startID)
    }
    return albums
}


export function createTestChart(albums = 3, index = 1): Chart {
    return {
        name: `Test chart ${index}`,
        albums: createTestPlaceholderAlbums(albums, ((index - 1) * albums) + 1),
        rowsX: 10,
        rowsY: 10,
        shape: { tag: 'Top', size: 40 }
    }
}


export function createTestState({ albums = 3, charts: chartsCount = 1 } = {}): State {
    const charts: Chart[] = []
    for (let index = 1; index < chartsCount + 1; index++) {
        const chart = createTestChart(albums, index)
        charts.push(chart)
    }
    return {
        version: STATE_VERSION,
        charts,
        activeChartIndex: 0,
        apiKey: 'Test API key',
        screenshot: {
            loading: false,
            scale: 2
        },
        search: {
            tag: 'Waiting',
            query: 'Test query'
        }
    }
}


export function createTestStateForEscaping(): State {
    return {
        ...createTestState(),
        search: {
            tag: 'Error',
            query: 'Test query',
            message: 'Test error message'
        },
        screenshot: {
            loading: true,
            scale: 2
        },
        highlightedID: 123
    }
}
