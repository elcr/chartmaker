import React, { FC, ChangeEvent } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { Chart } from '../state'
import { Label } from './Label'


const id = 'chartSelector'


type Props = DispatchProps<'UpdateActiveChart'> & {
    charts: Chart[]
    activeChartName: string
}


const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem'
})


export const ChartSelector: FC<Props> = ({ dispatch, charts, activeChartName }) => {
    function updateActiveChart(event: ChangeEvent<HTMLSelectElement>) {
        dispatch({
            tag: 'UpdateActiveChart',
            name: event.currentTarget.value
        })
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
                    value={activeChartName}
                    onChange={updateActiveChart}>
                {options}
            </select>
        </div>
    )
}
