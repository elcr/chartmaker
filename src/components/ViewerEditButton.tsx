import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { ViewerNavigationLink } from '@/components/ViewerNavigationLink'


export type ViewerEditButtonProps = DispatchProps


export const ViewerEditButton: FC<ViewerEditButtonProps> = ({ dispatch }) => {
    function importChart() {
        dispatch({ tag: 'ImportViewerChart' })
    }

    return (
        <ViewerNavigationLink dispatch={dispatch} onClick={importChart}>
            Edit
        </ViewerNavigationLink>
    )
}
