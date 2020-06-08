import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { ChartSelector } from './ChartSelector'
import { NewChartButton } from './NewChartButton'
import { RenameActiveChartButton } from './RenameActiveChartButton'
import { DeleteActiveChartButton } from './DeleteActiveChartButton'
import { Chart } from '../state'


type Props = DispatchProps<
    | 'ChangeActiveChart'
    | 'PromptForNewChart'
    | 'PromptToRenameActiveChart'
    | 'PromptToDeleteActiveChart'
> & {
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
                <RenameActiveChartButton dispatch={dispatch}/>
                <DeleteActiveChartButton dispatch={dispatch}/>
            </div>
        </div>
    )
}
