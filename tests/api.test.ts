import { LastFMResult, search, LastFMAlbum, SearchResult } from '../src/api'
import { ignore } from './utils'


function lastFMAlbum(x: number): LastFMAlbum {
    return {
        artist: `Test artist ${x}`,
        name: `Test album ${x}`,
        image: [
            { '#text': `small url ${x}` },
            { '#text': `medium url ${x}` },
            { '#text': `large url ${x}` }
        ]
    }
}


function mockSignal(aborted: boolean): AbortSignal {
    return {
        aborted,
        addEventListener: ignore,
        dispatchEvent: () => true,
        onabort: ignore,
        removeEventListener: ignore
    }
}


test('returns Ok for successful request', async () => {
    const mock = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve<LastFMResult>({
                results: {
                    albummatches: {
                        album: [
                            lastFMAlbum(1),
                            lastFMAlbum(2),
                            lastFMAlbum(3)
                        ]
                    }
                }
            })
        })
    )
    const signal = mockSignal(false)

    const result = await search({
        key: 'Test key',
        query: 'Test query',
        signal,
        fetcher: mock
    })

    expect(result).toMatchSnapshot()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(
        'https://ws.audioscrobbler.com/2.0/?method=album.search&format=json&api_key=Test%20key&album=Test%20query',
        { signal }
    )
})


test('excludes null albums from successful request', async () => {
    const mock = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve<LastFMResult>({
                results: {
                    albummatches: {
                        album: [
                            lastFMAlbum(1),
                            {
                                ...lastFMAlbum(2),
                                artist: ''
                            },
                            {
                                ...lastFMAlbum(3),
                                name: '(null)'
                            },
                            lastFMAlbum(4),
                            {
                                ...lastFMAlbum(5),
                                image: [
                                    { '#text': 'small url' },
                                    { '#text': '(null)' },
                                    { '#text': 'large url' }
                                ]
                            }
                        ]
                    }
                }
            })
        })
    )
    const result = await search({
        key: 'Test key',
        query: 'Test query',
        signal: mockSignal(false),
        fetcher: mock
    })
    expect(result).toMatchSnapshot()
})


test('returns Cancelled for cancelled request', async () => {
    const mock = jest.fn(Promise.reject)
    const result = await search({
        key: 'Test key',
        query: 'Test query',
        signal: mockSignal(true),
        fetcher: mock
    })
    expect(result).toEqual<SearchResult>({ tag: 'Cancelled' })
})


test('returns NetworkError for failed request', async () => {
    const mock = jest.fn(Promise.reject)
    const result = await search({
        key: 'Test key',
        query: 'Test query',
        signal: mockSignal(false),
        fetcher: mock
    })
    expect(result).toEqual<SearchResult>({ tag: 'NetworkError' })
})


test('returns JSONDecodeError for invalid json response', async () => {
    const mock = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: Promise.reject
        })
    )
    const result = await search({
        key: 'Test key',
        query: 'Test query',
        signal: mockSignal(false),
        fetcher: mock
    })
    expect(result).toEqual<SearchResult>({ tag: 'JSONDecodeError' })
})


test('returns InvalidResponseData for invalid response data', async () => {
    const mock = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({
                results: {
                    albummatches: {
                        albums: []
                    }
                }
            })
        })
    )
    const result = await search({
        key: 'Test key',
        query: 'Test query',
        signal: mockSignal(false),
        fetcher: mock
    })
    expect(result).toEqual<SearchResult>({ tag: 'InvalidResponseData' })
})
