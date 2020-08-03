import React, { FC } from 'react'

import type { ChartSelectorProps } from '@/components/ChartSelector'


const TestChartSelector: FC<ChartSelectorProps> = ({ charts, activeChartIndex }) => {
    const json = JSON.stringify(charts)
    return (
        <div className='test-chart-selector'>
            {`Charts: ${json}`}
            {`Active chart index: ${activeChartIndex}`}
        </div>
    )
}


export default TestChartSelector
