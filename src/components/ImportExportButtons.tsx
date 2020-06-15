import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { SidebarGroup } from './SidebarGroup'
import { ImportStateButton } from './ImportStateButton'
import { ExportStateButton } from './ExportStateButton'


type Props = DispatchProps<'PromptToSelectJSONToImport' | 'PromptToExportStateJSON'>


const style = css({
    display: 'flex'
})


export const ImportExportButtons: FunctionComponent<Props> = ({ dispatch }) =>
    <SidebarGroup>
        <div class={style}>
            <ImportStateButton dispatch={dispatch}/>
            <ExportStateButton dispatch={dispatch}/>
        </div>
    </SidebarGroup>
