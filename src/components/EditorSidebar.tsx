import type { FC, RefObject } from 'react'

import type { DispatchProps } from '@/reducer'
import type { Chart, SearchState, ScreenshotState } from '@/types'
import { ChartManager } from '@/components/ChartManager'
import { APIKeyInput } from '@/components/APIKeyInput'
import { ScreenshotButtons } from '@/components/ScreenshotButtons'
import { SearchBox } from '@/components/SearchBox'
import { SearchResults } from '@/components/SearchResults'
import { ChartShapeControls } from '@/components/ChartShapeControls'
import { Sidebar } from '@/components/Sidebar'
import { LoadSaveButtons } from '@/components/LoadSaveButtons'


export type EditorSidebarProps = DispatchProps & {
    charts: Chart[]
    activeChartIndex: number
    apiKey: string
    searchState: SearchState
    screenshotState: ScreenshotState
    chartRef: RefObject<HTMLElement>
}


export const EditorSidebar: FC<EditorSidebarProps> = ({
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
        <Sidebar>
            <LoadSaveButtons dispatch={dispatch}/>
            <ChartManager dispatch={dispatch}
                charts={charts}
                activeChartIndex={activeChartIndex}/>
            <ScreenshotButtons dispatch={dispatch}
                chartRef={chartRef}
                screenshotState={screenshotState}/>
            <ChartShapeControls {...charts[activeChartIndex]!}
                dispatch={dispatch}/>
            <APIKeyInput dispatch={dispatch} apiKey={apiKey}/>
            <SearchBox dispatch={dispatch} searchState={searchState}/>
            {searchResults}
        </Sidebar>
    )
}
