import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type DeleteActiveChartButtonProps = DispatchProps


export const DeleteActiveChartButton: FC<DeleteActiveChartButtonProps> = ({ dispatch }) => {
    function deleteActiveChart() {
        dispatch({ tag: 'PromptToDeleteActiveChart' })
    }

    return (
        <Button onClick={deleteActiveChart}>
            Delete
        </Button>
    )
}
