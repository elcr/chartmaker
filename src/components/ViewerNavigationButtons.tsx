import type { FC } from 'react'
import { css } from 'emotion'

import { SidebarGroup } from '@/components/SidebarGroup'
import type { DispatchProps } from '@/reducer'
import { ViewerBackButton } from '@/components/ViewerBackButton'
import { ViewerEditButton } from '@/components/ViewerEditButton'


const style = css({
    display: 'flex',
    justifyContent: 'space-between'
})


export type ViewerNavigationButtonsProps = DispatchProps


export const ViewerNavigationButtons: FC<ViewerNavigationButtonsProps> = ({ dispatch }) =>
    <SidebarGroup className={style}>
        <ViewerBackButton dispatch={dispatch}/>
        <ViewerEditButton dispatch={dispatch}/>
    </SidebarGroup>
