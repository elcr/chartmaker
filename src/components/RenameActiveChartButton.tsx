import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToRenameActiveChart'>


const style = css({
    margin: '0 0.5rem'
})


export const RenameActiveChartButton: FC<Props> = ({ dispatch }) => {
    function renameActiveChart() {
        dispatch({ tag: 'PromptToRenameActiveChart' })
    }

    return (
        <button className={style} onClick={renameActiveChart}>
            Rename
        </button>
    )
}
