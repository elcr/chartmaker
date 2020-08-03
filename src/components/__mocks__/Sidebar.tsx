import React, { FC } from 'react'

import { SidebarProps } from '@/components/Sidebar'


export const Sidebar: FC<SidebarProps> = ({
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
        <div className='mock-sidebar'>
            {`Charts: ${chartsJSON}`}
            {`Screenshot state: ${screenshotJSON}`}
            {`Search state: ${searchJSON}`}
            {`API key: ${apiKey}`}
            {`Active chart index: ${activeChartIndex}`}
        </div>
    )
}
