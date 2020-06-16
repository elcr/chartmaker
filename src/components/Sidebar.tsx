import { h, FunctionComponent } from 'preact'
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
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: '17rem',
    height: 'calc(100vh - 2rem)',
    marginRight: '1rem'
})


export const Sidebar: FunctionComponent<Props> = ({
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
        <aside class={style}>
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
