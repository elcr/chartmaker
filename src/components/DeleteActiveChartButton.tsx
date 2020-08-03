import React, { FC } from 'react'

import { DispatchProps } from '@/reducer'
import Button from '@/components/Button'


export type DeleteActiveChartButtonProps = DispatchProps<'PromptToDeleteActiveChart'>


const DeleteActiveChartButton: FC<DeleteActiveChartButtonProps> = ({ dispatch }) => {
    function deleteActiveChart() {
        dispatch({ tag: 'PromptToDeleteActiveChart' })
    }

    return (
        <Button onClick={deleteActiveChart}>
            Delete
        </Button>
    )
}


export default DeleteActiveChartButton
