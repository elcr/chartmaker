import { h, FunctionComponent, JSX, RefObject } from 'preact'
import { css } from 'emotion'

import ChartManager from './ChartManager'
import { DispatchProps } from '../reducer'
import { Chart, SearchState, ScreenshotState } from '../types'
import APIKeyInput from './APIKeyInput'
import ImportExportScreenshotButtons from './ImportExportScreenshotButtons'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import { SIDEBAR_WIDTH, CONTAINER_PADDING_SIZE } from '../style'
import ChartShapeControls from './ChartShapeControls'


type Props = DispatchProps<
    | 'UpdateActiveChart'
    | 'PromptForNewChart'
    | 'PromptToRenameActiveChart'
    | 'PromptToDeleteActiveChart'
    | 'UpdateAPIKey'
    | 'ImportStateFile'
    | 'PromptToExportState'
    | 'UpdateSearchQuery'
    | 'SendSearchRequest'
    | 'CancelSearchRequest'
    | 'UpdateScreenshotScale'
    | 'TakeScreenshot'
    | 'UpdateChartShape'
> & {
    charts: Chart[]
    activeChartIndex: number
    apiKey: string
    searchState: SearchState
    screenshotState: ScreenshotState
    chartRef: RefObject<HTMLElement>
}


const style = css({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: SIDEBAR_WIDTH,
    height: `calc(100vh - (${CONTAINER_PADDING_SIZE} * 2))`,
    marginRight: CONTAINER_PADDING_SIZE
})


const Sidebar: FunctionComponent<Props> = ({
    dispatch,
    charts,
    activeChartIndex,
    apiKey,
    searchState,
    screenshotState,
    chartRef
}) => {
    let searchResults: JSX.Element | undefined
    if (searchState.tag === 'Complete' && searchState.albums.length > 0) {
        searchResults = <SearchResults albums={searchState.albums}/>
    }

    return (
        <aside class={style}>
            <ChartManager dispatch={dispatch}
                charts={charts}
                activeChartIndex={activeChartIndex}/>
            <ImportExportScreenshotButtons dispatch={dispatch}
                chartRef={chartRef}
                screenshotState={screenshotState}/>
            <ChartShapeControls {...charts[activeChartIndex]}
                dispatch={dispatch}/>
            <APIKeyInput dispatch={dispatch} apiKey={apiKey}/>
            <SearchBox dispatch={dispatch} searchState={searchState}/>
            {searchResults}
        </aside>
    )
}


export default Sidebar
