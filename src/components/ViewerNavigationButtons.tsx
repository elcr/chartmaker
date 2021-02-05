import type { FC } from 'react'
import { css } from 'emotion'

import { SidebarGroup } from '@/components/SidebarGroup'
import type { DispatchProps } from '@/reducer'
import { ViewerBackButton } from '@/components/ViewerBackButton'
import { ViewerEditButton } from '@/components/ViewerEditButton'


const style = css({
    display: 'flex'
})


export type ViewerNavigationButtonsProps = DispatchProps & {
    importDisabled: boolean
}


export const ViewerNavigationButtons: FC<ViewerNavigationButtonsProps> = ({
    dispatch,
    importDisabled
}) => {
    let editButton: JSX.Element | undefined
    if (!importDisabled) {
        editButton = <ViewerEditButton dispatch={dispatch}/>
    }
    return (
        <SidebarGroup className={style}>
            <ViewerBackButton dispatch={dispatch}/>
            {editButton}
        </SidebarGroup>
    )
}
