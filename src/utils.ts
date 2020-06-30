import html2canvas from 'html2canvas'

import { BACKGROUND_COLOUR } from './style'
import { Number as Number_, Array as Array_, Runtype } from 'runtypes'


export function openClientFile(accept: string): Promise<File | undefined> {
    return new Promise(resolve => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = accept

        input.addEventListener('change', () => {
            const file = input.files?.[0]
            resolve(file)
        })

        // The input change event is never fired if the user closes the dialog.
        // This has no associated event, so there is no reliable way to know
        // when it happens. However, the dialog opening causes the body to lose
        // focus, and upon closing the body gains focus again.
        // Listening for the body regaining focus like this is the only
        // reliable way to clean up the input element. This doesn't work with
        // addEventListener for some reason.
        // Also, the document focus event always fires before the input change
        // event, so a timeout is needed before cleanup to stop the promise
        // from resolving too early before the input's file can be read.
        document.body.onfocus = () => {
            setTimeout(
                () => {
                    resolve()
                    input.remove()
                    document.body.onfocus = null
                },
                100
            )
        }

        input.click()
    })
}


export function readClientFileText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('error', reject)
        reader.addEventListener('load', () => resolve(reader.result as string))
        reader.readAsText(file, 'utf-8')
    })
}


export function findIndex<T>(array: ReadonlyArray<T>, predicate: (item: T) => boolean): number | null {
    const index = array.findIndex(predicate)
    return index === -1 ? null : index
}


export async function elementToDataURI(element: HTMLElement, scale: number) {
    const canvas = await html2canvas(element, {
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


export function downloadURI(uri: string, filename: string) {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    link.click()
    link.remove()
}


export const Integer = Number_.withConstraint(Number.isSafeInteger)


export function IntegerRange(minimum: number, maximum: number) {
    return Integer.withConstraint(number => number >= minimum && number <= maximum)
}


export function FixedSizeArray<T extends Runtype>(element: T, size: number) {
    return Array_(element).withConstraint(array => array.length === size)
}
