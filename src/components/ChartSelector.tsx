import type { FC } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import type { Chart } from '@/types'
import { SIDEBAR_ITEM_PADDING_SIZE } from '@/style'
import { Label } from '@/components/Label'
import { ControlledSelect } from '@/components/ControlledSelect'


export const id = 'chartSelector'


export type ChartSelectorProps = DispatchProps & {
    charts: Chart[]
    activeChartIndex: number
}


const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: SIDEBAR_ITEM_PADDING_SIZE
})


export const ChartSelector: FC<ChartSelectorProps> = ({
    dispatch,
    charts,
    activeChartIndex
}) => {
    function updateActiveChart(index: number) {
        dispatch({
            tag: 'UpdateActiveChart',
            index
        })
    }

    const options = charts.map((chart, index) =>
        <option key={chart.name} value={index}>
            {chart.name}
        </option>
    )

    return (
        <div className={containerStyle}>
            <Label target={id}>
                Active chart
            </Label>
            <ControlledSelect id={id}
                    value={activeChartIndex}
                    onChange={updateActiveChart}>
                {options}
            </ControlledSelect>
        </div>
    )
}
