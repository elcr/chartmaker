import React, { FC, ChangeEvent } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { Chart } from '../state'
import { Label } from './Label'


const id = 'chartSelector'


type Props = DispatchProps<'ChangeActiveChart'> & {
    charts: Chart[]
    activeChart: Chart
}


const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem'
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
            <Label target={id}>
                Active chart
            </Label>
            <select id={id}
                    value={activeChart.name}
                    onChange={updateActiveChart}>
                {options}
            </select>
        </div>
    )
}
