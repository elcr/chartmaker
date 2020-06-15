import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { ChartSelector } from './ChartSelector'
import { NewChartButton } from './NewChartButton'
import { RenameActiveChartButton } from './RenameActiveChartButton'
import { DeleteActiveChartButton } from './DeleteActiveChartButton'
import { Chart } from '../state'
import { SidebarGroup } from './SidebarGroup'


type Props = DispatchProps<
    | 'UpdateActiveChart'
    | 'PromptForNewChart'
    | 'PromptToRenameActiveChart'
    | 'PromptToDeleteActiveChart'
> & {
    charts: Chart[]
    activeChartIndex: number
}


const buttonsContainerStyle = css({
    display: 'flex'
})


export const ChartManager: FC<Props> = ({ dispatch, charts, activeChartIndex }) =>
    <SidebarGroup>
        <ChartSelector dispatch={dispatch}
            charts={charts}
            activeChartIndex={activeChartIndex}/>
        <div className={buttonsContainerStyle}>
            <NewChartButton dispatch={dispatch}/>
            <RenameActiveChartButton dispatch={dispatch}/>
            <DeleteActiveChartButton dispatch={dispatch}/>
        </div>
    </SidebarGroup>
