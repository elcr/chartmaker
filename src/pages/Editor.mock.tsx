import type { FC } from 'react'

import type { EditorProps } from '@/pages/Editor'


export const Editor: FC<EditorProps> = ({
    charts,
    activeChartIndex,
    apiKey,
    search,
    screenshot,
    highlightedID
}) => {
    const chartsJSON = JSON.stringify(charts, undefined, 2)
    const screenshotJSON = JSON.stringify(screenshot, undefined, 2)
    const searchJSON = JSON.stringify(search, undefined, 2)
    return (
        <div className='mock-editor'>
            {`Charts: ${chartsJSON}`}
            {`Search: ${searchJSON}`}
            {`Screenshot: ${screenshotJSON}`}
            {`Active chart index: ${activeChartIndex}`}
            {`API key: ${apiKey}`}
            {`Highlighted ID: ${highlightedID}`}
        </div>
    )
}
