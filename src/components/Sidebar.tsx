import React, { FC, RefObject } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '@/reducer'
import { Chart, SearchState, ScreenshotState } from '@/types'
import { SIDEBAR_WIDTH, CONTAINER_PADDING_SIZE } from '@/style'
import { ChartManager } from '@/components/ChartManager'
import { APIKeyInput } from '@/components/APIKeyInput'
import { ImportExportScreenshotButtons } from '@/components/ImportExportScreenshotButtons'
import { SearchBox } from '@/components/SearchBox'
import { SearchResults } from '@/components/SearchResults'
import { ChartShapeControls } from '@/components/ChartShapeControls'


export type SidebarProps = DispatchProps<
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
    | 'MoveActiveChart'
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


export const Sidebar: FC<SidebarProps> = ({
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
        <aside className={style}>
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
