import React, { FC } from 'react'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToExportStateJSON'>


export const ExportStateButton: FC<Props> = ({ dispatch }) => {
    function PromptToExportStateJSON() {
        dispatch({ tag: 'PromptToExportStateJSON' })
    }

    return (
        <button onClick={PromptToExportStateJSON}>
            Export charts
        </button>
    )
}
