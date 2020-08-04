import { findIndex, jsonToDataURI, downloadURI } from '@/utils'


describe('findIndex', () => {
    test('returns index when item matching predicate is in array', () => {
        const index = findIndex([ 'a', 'b', 'c', 'd' ], char => char === 'c')
        expect(index).toBe(2)
    })

    test('returns null when no item in array matches predicate', () => {
        const index = findIndex([ 'a', 'b', 'c', 'd' ], char => char === 'e')
        expect(index).toBeNull()
    })
})


describe('elementToDataURI', () => {
    // This will likely stay todo for now - jsdom doesn't implement
    // window.scrollTo which html2canvas needs, and my I only found that out
    // after my initial attempts at implementing this test caused some nasty
    // out of memory errors
    test.todo('returns data uri for scaled image')
})


describe('jsonToDataURI', () => {
    test('returns escaped JSON data uri', () => {
        const json = JSON.stringify({ test: 'test json' })
        const uri = jsonToDataURI(json)
        expect(uri).toMatchSnapshot()
    })
})


describe('downloadURI', () => {
    const setHrefMock = jest.spyOn(HTMLAnchorElement.prototype, 'href', 'set')
    const setDownloadMock = jest.spyOn(HTMLAnchorElement.prototype, 'download', 'set')
    const clickMock = jest.spyOn(HTMLAnchorElement.prototype, 'click')
    const removeMock = jest.spyOn(HTMLAnchorElement.prototype, 'remove')

    afterAll(jest.restoreAllMocks)

    test('creates, clicks, and removes link for uri', () => {
        const uri = 'data:,test'
        const filename = 'test.txt'

        downloadURI(uri, filename)

        expect(setHrefMock).toHaveBeenCalledTimes(1)
        expect(setHrefMock).toHaveBeenCalledWith(uri)
        expect(setDownloadMock).toHaveBeenCalledTimes(1)
        expect(setDownloadMock).toHaveBeenCalledWith(filename)
        expect(clickMock).toHaveBeenCalledTimes(1)
        expect(removeMock).toHaveBeenCalledTimes(1)
    })
})
