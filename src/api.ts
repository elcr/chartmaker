type LastFMResult = {
    results: {
        albummatches: {
            album: {
                name: string
                artist: string
                image: {
                    '#text': string
                }[]
            }[]
        }
    }
}


function isLastFMNullString(value: string): boolean {
    // Although Last.fm offers a JSON API, it doesn't make use of any JSON
    // types other than strings. Null values are represented by the string
    // '(null)' or just an empty string. Why even bother with JSON then...?
    return value === '' || value === '(null)'
}


type Album = {
    artist: string
    title: string
    url: string
}


function formatLastFMResult(result: LastFMResult): Album[] {
    const albums: Album[] = []
    for (const album of result.results.albummatches.album) {
        if (isLastFMNullString(album.artist)
                || isLastFMNullString(album.name)
                || album.image.some(image => isLastFMNullString(image['#text']))) {
            continue
        }
        albums.push({
            artist: album.artist,
            title: album.name,
            url: album.image[album.image.length - 1]['#text']
        })
    }
    return albums
}


type SearchArguments = {
    key: string
    query: string
    signal: AbortSignal
}


type SearchResult =
    | { tag: 'Ok', albums: Album[] }
    | { tag: 'StatusError', status: number }
    | { tag: 'JSONDecodeError' }
    | { tag: 'NetworkError' }


export async function search({ key, query, signal }: SearchArguments): Promise<SearchResult> {
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query.trim()}&api_key=${key.trim()}&format=json`

    let response: Response
    try {
        response = await fetch(url, { signal })
    }
    catch {
        return { tag: 'NetworkError' }
    }
    if (!response.ok) {
        return { tag: 'StatusError', status: response.status }
    }

    let result: LastFMResult
    try {
        result = await response.json()
    }
    catch {
        return { tag: 'JSONDecodeError' }
    }

    return {
        tag: 'Ok',
        albums: formatLastFMResult(result)
    }
}
