import React, { FC } from 'react'
import { css } from 'emotion'

import { ChartManager } from './ChartManager'
import { DispatchProps, Chart } from '../reducer'


type Props = DispatchProps<'ChangeActiveChart' | 'PromptForNewChart'> & {
    charts: Chart[]
    activeChart: Chart
}


const style = css({
    marginRight: '1rem',
    width: '10rem'
})


export const Sidebar: FC<Props> = props => {
    return (
        <aside className={style}>
            <ChartManager {...props}/>
        </aside>
    )
}
