import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { Chart } from '../state'
import { Label } from './Label'


const id = 'chartSelector'


type Props = DispatchProps<'UpdateActiveChart'> & {
    charts: Chart[]
    activeChartIndex: number
}


const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem'
})


export const ChartSelector: FunctionComponent<Props> = ({ dispatch, charts, activeChartIndex }) => {
    function updateActiveChart(event: Event) {
        dispatch({
            tag: 'UpdateActiveChart',
            index: Number((event.currentTarget as any).value)
        })
    }

    const options = charts.map((chart, index) =>
        <option key={chart.name} value={index}>
            {chart.name}
        </option>
    )

    return (
        <div class={containerStyle}>
            <Label target={id}>
                Active chart
            </Label>
            <select id={id}
                    value={activeChartIndex}
                    onInput={updateActiveChart}>
                {options}
            </select>
        </div>
    )
}
