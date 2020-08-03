import React, { FC } from 'react'

import { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type ExportStateButtonProps = DispatchProps<'PromptToExportState'>


export const ExportStateButton: FC<ExportStateButtonProps> = ({ dispatch }) => {
    function promptToExportState() {
        dispatch({ tag: 'PromptToExportState' })
    }

    return (
        <Button onClick={promptToExportState}>
            Export state
        </Button>
    )
}
