import React, { FC } from 'react'
import { css } from 'emotion'

import { ChartManager } from './ChartManager'
import { DispatchProps } from '../reducer'
import { Chart, SearchState } from '../state'
import { APIKeyInput } from './APIKeyInput'
import { ImportExportButtons } from './ImportExportButtons'
import { SearchBox } from './SearchBox'
import { SearchResults } from './SearchResults'


type Props = DispatchProps<
    | 'UpdateActiveChart'
    | 'PromptForNewChart'
    | 'PromptToRenameActiveChart'
    | 'PromptToDeleteActiveChart'
    | 'UpdateAPIKey'
    | 'PromptToSelectImportJSON'
    | 'PromptToExportState'
    | 'UpdateSearchQuery'
    | 'SendSearchRequest'
    | 'CancelSearchRequest'
> & {
    charts: Chart[]
    activeChart: Chart,
    apiKey: string
    searchState: SearchState
}


const style = css({
    marginRight: '1rem',
    width: '15rem'
})


export const Sidebar: FC<Props> = ({ dispatch, charts, activeChart, apiKey, searchState }) => {
    const searchResults = searchState.tag === 'Complete'
        ? <SearchResults albums={searchState.albums}/>
        : null

    return (
        <aside className={style}>
            <ChartManager dispatch={dispatch} charts={charts} activeChart={activeChart}/>
            <ImportExportButtons dispatch={dispatch}/>
            <APIKeyInput dispatch={dispatch} apiKey={apiKey}/>
            <SearchBox dispatch={dispatch} searchState={searchState}/>
            {searchResults}
        </aside>
    )
}
