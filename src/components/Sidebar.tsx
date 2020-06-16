import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'
import { Ref } from 'preact/hooks'

import { ChartManager } from './ChartManager'
import { DispatchProps } from '../reducer'
import { Chart, SearchState, ScreenshotState } from '../state'
import { APIKeyInput } from './APIKeyInput'
import { ImportExportButtons } from './ImportExportButtons'
import { SearchBox } from './SearchBox'
import { SearchResults } from './SearchResults'
import { SIDEBAR_WIDTH, CONTAINER_PADDING_SIZE } from '../style'
import { ScreenshotButtons } from './ScreenshotButtons'


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
    | 'UpdateScreenshotScale'
    | 'TakeScreenshot'
> & {
    charts: Chart[]
    activeChartIndex: number,
    apiKey: string
    searchState: SearchState
    screenshotState: ScreenshotState
    chartRef: Ref<HTMLElement>
}


const style = css({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: SIDEBAR_WIDTH,
    height: `calc(100vh - (${CONTAINER_PADDING_SIZE} * 2))`,
    marginRight: CONTAINER_PADDING_SIZE
})


export const Sidebar: FunctionComponent<Props> = ({
    dispatch,
    charts,
    activeChartIndex,
    apiKey,
    searchState,
    screenshotState,
    chartRef
}) => {
    const searchResults = searchState.tag === 'Complete'
        && searchState.albums.length > 0
        ? <SearchResults albums={searchState.albums}/>
        : null

    return (
        <aside class={style}>
            <ChartManager dispatch={dispatch}
                charts={charts}
                activeChartIndex={activeChartIndex}/>
            <ImportExportButtons dispatch={dispatch}/>
            <ScreenshotButtons dispatch={dispatch}
                chartRef={chartRef}
                screenshotState={screenshotState}/>
            <APIKeyInput dispatch={dispatch} apiKey={apiKey}/>
            <SearchBox dispatch={dispatch} searchState={searchState}/>
            {searchResults}
        </aside>
    )
}
