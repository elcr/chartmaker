import React, { FC } from 'react'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'ExportState'>


export const ExportStateButton: FC<Props> = ({ dispatch }) => {
    function exportState() {
        dispatch({ tag: 'ExportState' })
    }

    return (
        <button onClick={exportState}>
            Export charts
        </button>
    )
}
