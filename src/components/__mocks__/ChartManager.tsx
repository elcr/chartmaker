import type { FC } from 'react'

import type { ChartManagerProps } from '@/components/ChartManager'


export const ChartManager: FC<ChartManagerProps> = ({
    charts,
    activeChartIndex
}) => {
    const json = JSON.stringify(charts)
    return (
        <div className='mock-chart-manager'>
            {`Charts: ${json}`}
            {`Active chart index: ${activeChartIndex}`}
        </div>
    )
}
