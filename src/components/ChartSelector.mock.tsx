const mock: typeof import('@/components/ChartSelector') = {
    id: 'chartSelector',

    ChartSelector: ({ charts, activeChartIndex }) => {
        const json = JSON.stringify(charts)
        return (
            <div className='mock-chart-selector'>
                {`Charts: ${json}`}
                {`Active chart index: ${activeChartIndex}`}
            </div>
        )
    }
}


export const ChartSelector = mock.ChartSelector
