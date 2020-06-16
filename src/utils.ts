import html2canvas from 'html2canvas'

import { BACKGROUND_COLOUR } from './style'


export function readInputFileText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('error', () => reject())
        reader.addEventListener('load', () => resolve(reader.result as string))
        reader.readAsText(file, 'utf-8')
    })
}


export function findIndex<T>(array: ReadonlyArray<T>, predicate: (item: T) => boolean): number | null {
    const index = array.findIndex(predicate)
    return index === -1 ? null : index
}


export async function elementToURI(element: HTMLElement, scale: number) {
    const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        imageTimeout: 0,
        backgroundColor: BACKGROUND_COLOUR
    })
    return canvas.toDataURL()
}


export function downloadURI(uri: string, filename: string) {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = uri
    link.download = filename
    try {
        link.click()
    }
    finally {
        link.remove()
    }
}
