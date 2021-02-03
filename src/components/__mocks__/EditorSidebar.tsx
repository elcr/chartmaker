import type { FC } from 'react'

import type { EditorSidebarProps } from '@/components/EditorSidebar'


export const EditorSidebar: FC<EditorSidebarProps> = ({
    charts,
    activeChartIndex,
    apiKey,
    screenshotState,
    searchState
}) => {
    const chartsJSON = JSON.stringify(charts, undefined, 2)
    const screenshotJSON = JSON.stringify(screenshotState, undefined, 2)
    const searchJSON = JSON.stringify(searchState, undefined, 2)
    return (
        <div className='mock-editor-sidebar'>
            {`Charts: ${chartsJSON}`}
            {`Screenshot state: ${screenshotJSON}`}
            {`Search state: ${searchJSON}`}
            {`API key: ${apiKey}`}
            {`Active chart index: ${activeChartIndex}`}
        </div>
    )
}
