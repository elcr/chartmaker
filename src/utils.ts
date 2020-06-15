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
