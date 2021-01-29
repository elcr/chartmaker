import type { FC } from 'react'

import type { SearchResultsProps } from '@/components/SearchResults'


export const SearchResults: FC<SearchResultsProps> = ({
    albums
}) => {
    const json = JSON.stringify(albums)
    return (
        <div className='mock-search-results'>
            {`Albums: ${json}`}
        </div>
    )
}
