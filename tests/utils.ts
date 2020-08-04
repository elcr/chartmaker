import fs from 'fs'
import util from 'util'

import { unmountComponentAtNode } from 'react-dom'
import { Simulate } from 'react-dom/test-utils'

import { NamedAlbum, PlaceholderAlbum } from '@/types'


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

    public constructor(types: ReadonlyArray<string> = []) {
        this.types = types
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


export const readFile = util.promisify(fs.readFile)


export function namedAlbums(count: number, start = 1): NamedAlbum[] {
    const albums: NamedAlbum[] = []
    for (let index = start; index < count + 1; index++) {
        albums.push({
            placeholder: false,
            id: index,
            name: `Test album ${index}`,
            url: `https://test.com/${index}`
        })
    }
    return albums
}


export function placeholderAlbums(count: number, start = 1): PlaceholderAlbum[] {
    const albums: PlaceholderAlbum[] = []
    for (let index = start; index < count + 1; index++) {
        albums.push({
            placeholder: true,
            id: index
        })
    }
    return albums
}
