import React, { FC } from 'react'

import { DispatchProps } from '@/reducer'
import Button from '@/components/Button'


export type NewChartButtonProps = DispatchProps<'PromptForNewChart'>


const NewChartButton: FC<NewChartButtonProps> = ({ dispatch }) => {
    function addNewChart() {
        dispatch({ tag: 'PromptForNewChart' })
    }

    return (
        <Button onClick={addNewChart}>
            New
        </Button>
    )
}


export default NewChartButton
