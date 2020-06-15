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
    | 'PromptToSelectJSONToImport'
    | 'PromptToExportStateJSON'
    | 'UpdateSearchQuery'
    | 'SendSearchRequest'
    | 'CancelSearchRequest'
> & {
    charts: Chart[]
    activeChartIndex: number,
    apiKey: string
    searchState: SearchState
}


const style = css({
    marginRight: '1rem',
    width: '16rem',
    flexShrink: 0
})


export const Sidebar: FC<Props> = ({
    dispatch,
    charts,
    activeChartIndex,
    apiKey,
    searchState
}) => {
    const searchResults = searchState.tag === 'Complete'
        ? <SearchResults albums={searchState.albums}/>
        : null

    return (
        <aside className={style}>
            <ChartManager dispatch={dispatch}
                charts={charts}
                activeChartIndex={activeChartIndex}/>
            <ImportExportButtons dispatch={dispatch}/>
            <APIKeyInput dispatch={dispatch} apiKey={apiKey}/>
            <SearchBox dispatch={dispatch} searchState={searchState}/>
            {searchResults}
        </aside>
    )
}
