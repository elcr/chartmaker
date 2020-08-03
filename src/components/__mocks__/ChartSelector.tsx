import React, { FC } from 'react'

import { ChartSelectorProps } from '@/components/ChartSelector'


export const ChartSelector: FC<ChartSelectorProps> = ({ charts, activeChartIndex }) => {
    const json = JSON.stringify(charts)
    return (
        <div className='mock-chart-selector'>
            {`Charts: ${json}`}
            {`Active chart index: ${activeChartIndex}`}
        </div>
    )
}
