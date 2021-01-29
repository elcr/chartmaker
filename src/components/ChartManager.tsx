import type { FC } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import type { Chart } from '@/types'
import { ChartSelector } from '@/components/ChartSelector'
import { NewChartButton } from '@/components/NewChartButton'
import { RenameActiveChartButton } from '@/components/RenameActiveChartButton'
import { DeleteActiveChartButton } from '@/components/DeleteActiveChartButton'
import { SidebarGroup } from '@/components/SidebarGroup'
import { MoveChartButton } from '@/components/MoveChartButton'


export type ChartManagerProps = DispatchProps & {
    charts: Chart[]
    activeChartIndex: number
}


const buttonsContainerStyle = css({
    display: 'flex',
    justifyContent: 'space-between'
})


const groupStyle = css({
    display: 'flex'
})


export const ChartManager: FC<ChartManagerProps> = ({
    dispatch,
    charts,
    activeChartIndex
}) =>
    <SidebarGroup>
        <ChartSelector dispatch={dispatch}
            charts={charts}
            activeChartIndex={activeChartIndex}/>
        <div className={buttonsContainerStyle}>
            <div className={groupStyle}>
                <NewChartButton dispatch={dispatch}/>
                <RenameActiveChartButton dispatch={dispatch}/>
                <DeleteActiveChartButton dispatch={dispatch}/>
            </div>
            <div className={groupStyle}>
                <MoveChartButton dispatch={dispatch}
                        direction='Up'
                        disabled={activeChartIndex === 0}>
                    ↑
                </MoveChartButton>
                <MoveChartButton dispatch={dispatch}
                        direction='Down'
                        disabled={activeChartIndex === charts.length - 1}>
                    ↓
                </MoveChartButton>
            </div>
        </div>
    </SidebarGroup>
