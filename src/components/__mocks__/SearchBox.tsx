import React, { FC } from 'react'

import { SearchBoxProps } from '@/components/SearchBox'


export const SearchBox: FC<SearchBoxProps> = ({
    searchState
}) => {
    const json = JSON.stringify(searchState)
    return (
        <div className='mock-search-box'>
            {`Search state: ${json}`}
        </div>
    )
}
