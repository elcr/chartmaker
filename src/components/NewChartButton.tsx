import React, { FC } from 'react'

import { DispatchProps } from '@/reducer'
import Button from '@/components/Button'


type Props = DispatchProps<'PromptForNewChart'>


const NewChartButton: FC<Props> = ({ dispatch }) => {
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
