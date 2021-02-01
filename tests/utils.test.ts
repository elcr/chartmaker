import fs from 'fs'
import util from 'util'
import path from 'path'

import { jsonToDataURI, downloadURI, fileToDataURI } from '@/utils'


describe('elementToDataURI', () => {
    // This will likely stay todo for now - jsdom doesn't implement
    // window.scrollTo which html2canvas needs, and I only found that out after
    // my initial attempts at implementing this test caused some nasty
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


describe('fileToDataURI', () => {
    test.each([ 'blue.bmp', 'red.bmp' ])('returns data uri for file', async fileName => {
        const filePath = path.join(__dirname, fileName)
        const { buffer } = await util.promisify(fs.readFile)(filePath)
        const uri = await fileToDataURI({
            arrayBuffer: () => Promise.resolve(buffer),
            type: 'image/bmp'
        } as any)
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
