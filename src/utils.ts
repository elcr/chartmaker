import html2canvas from 'html2canvas'
import { fromUint8Array as base64FromUint8Array } from 'js-base64'

import { BACKGROUND_COLOUR } from '@/style'


export function findIndex<T>(array: ReadonlyArray<T>, predicate: (item: T) => boolean): number | null {
    const index = array.findIndex(predicate)
    return index === -1 ? null : index
}


export async function elementToDataURI(element: HTMLElement, scale: number) {
    const canvas = await html2canvas(element, {
        allowTaint: true,
        scale,
        useCORS: true,
        imageTimeout: 0,
        backgroundColor: BACKGROUND_COLOUR
    })
    return canvas.toDataURL()
}


export function jsonToDataURI(json: string): string {
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(json)
}


export async function fileToDataURI(file: File): Promise<string> {
    const buffer = await file.arrayBuffer()
    const array = new Uint8Array(buffer)
    const base64 = base64FromUint8Array(array)
    return `data:${file.type};base64,${base64}`
}


export function downloadURI(uri: string, filename: string) {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    link.click()
    link.remove()
}
