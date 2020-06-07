import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps, Chart } from '../reducer'
import { ChartSelector } from './ChartSelector'
import { NewChartButton } from './NewChartButton'


type Props = DispatchProps<'ChangeActiveChart' | 'PromptForNewChart'> & {
    charts: Chart[]
    activeChart: Chart
}


const containerStyle = css({
    borderBottom: '1px solid white',
    paddingBottom: '1rem',
    marginBottom: '1rem'
})


const buttonsContainerStyle = css({
    display: 'flex'
})


export const ChartManager: FC<Props> = ({ dispatch, charts, activeChart }) => {
    return (
        <div className={containerStyle}>
            <ChartSelector dispatch={dispatch}
                charts={charts}
                activeChart={activeChart}/>
            <div className={buttonsContainerStyle}>
                <NewChartButton dispatch={dispatch}/>
            </div>
        </div>
    )
}
