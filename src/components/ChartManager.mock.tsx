const mock: typeof import('@/components/ChartManager') = {
    ChartManager: ({ charts, activeChartIndex }) => {
        const json = JSON.stringify(charts)
        return (
            <div className='mock-chart-manager'>
                {`Charts: ${json}`}
                {`Active chart index: ${activeChartIndex}`}
            </div>
        )
    }
}


export const ChartManager = mock.ChartManager
