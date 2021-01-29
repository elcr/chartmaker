import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type ExportStateButtonProps = DispatchProps


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
