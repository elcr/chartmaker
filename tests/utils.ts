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


export function fireEvent(type: keyof typeof Simulate, element?: Element | ChildNode | null) {
    if (element == null) {
        throw new Error('element not found')
    }
    Simulate[type](element as Element)
}


export function ignore() {}
