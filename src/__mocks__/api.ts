import type { search as _search } from '@/api'
export type { SearchResult, SearchArguments } from '@/api'


export const search = jest.fn<ReturnType<typeof _search>, Parameters<typeof _search>>()
