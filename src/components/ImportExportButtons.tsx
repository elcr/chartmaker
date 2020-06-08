import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { SidebarGroup } from './SidebarGroup'
import { ImportStateButton } from './ImportStateButton'
import { ExportStateButton } from './ExportStateButton'


type Props = DispatchProps<'PromptToSelectImportJSON' | 'PromptToExportState'>


const style = css({
    display: 'flex'
})


export const ImportExportButtons: FC<Props> = ({ dispatch }) =>
    <SidebarGroup>
        <div className={style}>
            <ImportStateButton dispatch={dispatch}/>
            <ExportStateButton dispatch={dispatch}/>
        </div>
    </SidebarGroup>
