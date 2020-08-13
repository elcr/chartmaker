import {
    Record as Record_,
    Array as Array_,
    String as String_,
    Static
} from 'runtypes'


const LastFMAlbum = Record_({
    name: String_,
    artist: String_,
    image: Array_(
        Record_({
            '#text': String_
        })
    )
})


const LastFMResult = Record_({
    results: Record_({
        albummatches: Record_({
            album: Array_(LastFMAlbum)
        })
    })
})


export type LastFMAlbum = Static<typeof LastFMAlbum>
export type LastFMResult = Static<typeof LastFMResult>


function isLastFMNullString(value: string): boolean {
    // Although Last.fm offers a JSON API, it doesn't make use of any JSON
    // types other than strings. Null values are represented by the string
    // '(null)' or just an empty string. Why even bother with JSON then...?
    return value === '' || value === '(null)'
}


export type SearchResultAlbum = {
    name: string
    url: string
}


function formatLastFMResult(result: LastFMResult): SearchResultAlbum[] {
    const albums: SearchResultAlbum[] = []
    for (const album of result.results.albummatches.album) {
        if (isLastFMNullString(album.artist)
                || isLastFMNullString(album.name)
                || album.image.some(image => isLastFMNullString(image['#text']))) {
            continue
        }
        albums.push({
            name: `${album.artist} - ${album.name}`,
            url: album.image[album.image.length - 1]['#text']
        })
    }
    return albums
}


export type SearchArguments = {
    key: string
    query: string
    signal: AbortSignal
}


export type SearchResult =
    | { tag: 'Ok', albums: SearchResultAlbum[] }
    | { tag: 'StatusError', status: number }
    | { tag: 'JSONDecodeError' }
    | { tag: 'InvalidResponseData' }
    | { tag: 'NetworkError' }
    | { tag: 'Cancelled' }


function joinURLQuery(base: string, query: Record<string, string>): string {
    const joinedQuery = Object.entries(query)
        .map(([ key, value ]) => {
            const escapedKey = encodeURIComponent(key.trim())
            const escapedValue = encodeURIComponent(value.trim())
            return `${escapedKey}=${escapedValue}`
        })
        .join('&')
    return `${base}?${joinedQuery}`
}


export async function search({
    key,
    query,
    signal
}: SearchArguments): Promise<SearchResult> {
    const url = joinURLQuery('https://ws.audioscrobbler.com/2.0/', {
        method: 'album.search',
        format: 'json',
        api_key: key,
        album: query
    })

    let response: Response
    try {
        response = await fetch(url, { signal })
    }
    catch {
        return {
            tag: signal.aborted
                ? 'Cancelled'
                : 'NetworkError'
        }
    }
    if (!response.ok) {
        return {
            tag: 'StatusError',
            status: response.status
        }
    }

    let result: unknown
    try {
        result = await response.json()
    }
    catch {
        return { tag: 'JSONDecodeError' }
    }

    if (!LastFMResult.guard(result)) {
        return { tag: 'InvalidResponseData' }
    }

    return {
        tag: 'Ok',
        albums: formatLastFMResult(result)
    }
}
