import React, { FC } from 'react'

import { DispatchProps } from '../reducer'
import Button from './Button'


type Props = DispatchProps<'PromptToExportState'>


const ExportStateButton: FC<Props> = ({ dispatch }) => {
    function promptToExportState() {
        dispatch({ tag: 'PromptToExportState' })
    }

    return (
        <Button onClick={promptToExportState}>
            Export state
        </Button>
    )
}


export default ExportStateButton
