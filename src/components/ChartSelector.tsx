import React, { FC, ChangeEvent } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { Chart } from '../state'


type Props = DispatchProps<'ChangeActiveChart'> & {
    charts: Chart[]
    activeChart: Chart
}


const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem'
})


const labelStyle = css({
    marginBottom: '0.25rem'
})


export const ChartSelector: FC<Props> = ({ dispatch, charts, activeChart }) => {
    function updateActiveChart(event: ChangeEvent<HTMLSelectElement>) {
        const chart = charts.find(chart =>
            chart.name === event.currentTarget.value
        )
        if (chart === undefined) {
            return
        }
        dispatch({ tag: 'ChangeActiveChart', chart })
    }

    const options = charts.map(chart =>
        <option key={chart.name} value={chart.name}>
            {chart.name}
        </option>
    )

    return (
        <div className={containerStyle}>
            <label className={labelStyle} htmlFor='selectChart'>
                Active chart
            </label>
            <select id='selectChart'
                    value={activeChart.name}
                    onChange={updateActiveChart}>
                {options}
            </select>
        </div>
    )
}
