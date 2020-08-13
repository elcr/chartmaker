import type { SearchResult, SearchArguments } from '@/api'
export type { SearchResult, SearchArguments, SearchResultAlbum } from '@/api'


export const search = jest.fn<Promise<SearchResult>, [ SearchArguments ]>()
