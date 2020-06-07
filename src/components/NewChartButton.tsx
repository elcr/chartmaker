import React, { FC } from 'react'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptForNewChart'>


export const NewChartButton: FC<Props> = ({ dispatch }) => {
    function addNewChart() {
        dispatch({ tag: 'PromptForNewChart' })
    }

    return (
        <button onClick={addNewChart}>
            New
        </button>
    )
}
