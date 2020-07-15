import { MutableRefObject } from 'react'
import { unmountComponentAtNode } from 'react-dom'


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


export function clickEvent() {
    return new MouseEvent('click', { bubbles: true })
}


export function dragEvent(type: 'dragstart' | 'dragenter' | 'dragover' | 'drop') {
    return new Event(type, { bubbles: true })
}


export function ignore() {}
