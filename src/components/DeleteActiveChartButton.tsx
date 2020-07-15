import React, { FC } from 'react'

import { DispatchProps } from '../reducer'
import Button from './Button'


type Props = DispatchProps<'PromptToDeleteActiveChart'>


const DeleteActiveChartButton: FC<Props> = ({ dispatch }) => {
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
