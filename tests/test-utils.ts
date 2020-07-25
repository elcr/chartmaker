import { MutableRefObject } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { Simulate } from 'react-dom/test-utils'


export function setRenderContainer(ref: MutableRefObject<HTMLElement | null>) {
    ref.current = document.createElement('div')
    ref.current.id = 'test-render-container'
    document.body.appendChild(ref.current)
}


export function clearRenderContainer(ref: MutableRefObject<HTMLElement | null>) {
    if (ref.current === null) {
        return
    }
    unmountComponentAtNode(ref.current)
    ref.current.remove()
}


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
