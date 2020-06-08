import React, { FC } from 'react'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToExportState'>


export const ExportStateButton: FC<Props> = ({ dispatch }) => {
    function promptToExportState() {
        dispatch({ tag: 'PromptToExportState' })
    }

    return (
        <button onClick={promptToExportState}>
            Export charts
        </button>
    )
}
