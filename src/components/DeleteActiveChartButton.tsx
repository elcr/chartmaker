import React, { FC } from 'react'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToDeleteActiveChart'>


export const DeleteActiveChartButton: FC<Props> = ({ dispatch }) => {
    function deleteActiveChart() {
        dispatch({ tag: 'PromptToDeleteActiveChart' })
    }

    return (
        <button onClick={deleteActiveChart}>
            Delete
        </button>
    )
}
