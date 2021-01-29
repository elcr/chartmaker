import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '@/reducer'
import { SIDEBAR_LABEL_PADDING_SIZE, ERROR_TEXT_COLOUR } from '@/style'
import { SearchState } from '@/types'
import { Label } from '@/components/Label'
import { ControlledForm } from '@/components/ControlledForm'
import { SidebarGroup } from '@/components/SidebarGroup'
import { ControlledInput } from '@/components/ControlledInput'


export const id = 'search'


export type SearchBoxProps = DispatchProps & {
    searchState: SearchState
}


const errorStyle = css({
    color: ERROR_TEXT_COLOUR,
    marginBottom: SIDEBAR_LABEL_PADDING_SIZE,
    userSelect: 'none'
})


export const SearchBox: FC<SearchBoxProps> = ({ dispatch, searchState }) => {
    function sendSearchRequest() {
        dispatch({ tag: 'CancelSearchRequest' })
        dispatch({ tag: 'SendSearchRequest' })
    }

    function updateQuery(query: string) {
        dispatch({
            tag: 'UpdateSearchQuery',
            query
        })
    }

    const errorMessage = searchState.tag === 'Error'
        ? (
            <div className={errorStyle}>
                {searchState.message}
            </div>
        )
        : null

    return (
        <SidebarGroup>
            <ControlledForm onSubmit={sendSearchRequest}>
                <Label target={id}>
                    Search for albums
                </Label>
                {errorMessage}
                <ControlledInput id={id}
                    type='search'
                    value={searchState.query}
                    onChange={updateQuery}
                    disabled={searchState.tag === 'Loading'}/>
            </ControlledForm>
        </SidebarGroup>
    )
}
