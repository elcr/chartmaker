import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'
import { Button } from './Button'


type Props = DispatchProps<'PromptToExportState'>


export const ExportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    function PromptToExportState() {
        dispatch({ tag: 'PromptToExportState' })
    }

    return (
        <Button onClick={PromptToExportState}>
            Export state
        </Button>
    )
}
