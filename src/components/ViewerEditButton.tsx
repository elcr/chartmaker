import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type ViewerEditButtonProps = DispatchProps


export const ViewerEditButton: FC<ViewerEditButtonProps> = ({ dispatch }) => {
    function importChart() {
        dispatch({ tag: 'ImportViewerChart' })
    }

    return (
        <Button onClick={importChart}>
            Edit
        </Button>
    )
}
