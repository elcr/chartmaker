import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '@/reducer'
import { Chart } from '@/types'
import { ChartSelector } from '@/components/ChartSelector'
import { NewChartButton } from '@/components/NewChartButton'
import { RenameActiveChartButton } from '@/components/RenameActiveChartButton'
import { DeleteActiveChartButton } from '@/components/DeleteActiveChartButton'
import { SidebarGroup } from '@/components/SidebarGroup'


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
