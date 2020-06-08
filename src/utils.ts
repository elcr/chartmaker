export function splitArrayAtIndex<T>(array: ReadonlyArray<T>, index: number): [ T[], T[] ] {
    return [
        array.slice(0, index),
        array.slice(index + 1)
    ]
}


export function readInputFileText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('error', () => reject())
        reader.addEventListener('load', () => resolve(reader.result as string))
        reader.readAsText(file, 'utf-8')
    })
}
