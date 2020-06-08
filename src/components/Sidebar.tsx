import React, { FC } from 'react'
import { css } from 'emotion'

import { ChartManager } from './ChartManager'
import { DispatchProps } from '../reducer'
import { Chart } from '../state'
import { APIKeyInput } from './APIKeyInput'


type Props = DispatchProps<
    | 'ChangeActiveChart'
    | 'PromptForNewChart'
    | 'PromptToRenameActiveChart'
    | 'PromptToDeleteActiveChart'
    | 'UpdateAPIKey'
> & {
    charts: Chart[]
    activeChart: Chart,
    apiKey: string
}


const style = css({
    marginRight: '1rem',
    width: '15rem'
})


export const Sidebar: FC<Props> = props => {
    return (
        <aside className={style}>
            <ChartManager {...props}/>
            <APIKeyInput {...props}/>
        </aside>
    )
}
