import React, { FC } from 'react'
import { css } from 'emotion'

import { ChartManager } from './ChartManager'
import { DispatchProps } from '../reducer'
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


const style = css({
    marginRight: '1rem',
    width: '15rem'
})


export const Sidebar: FC<Props> = props => {
    return (
        <aside className={style}>
            <ChartManager {...props}/>
        </aside>
    )
}
