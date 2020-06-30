import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'
import { Button } from './Button'


type Props = DispatchProps<'PromptToExportState'>


export const ExportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    function promptToExportState() {
        dispatch({ tag: 'PromptToExportState' })
    }

    return (
        <Button onClick={promptToExportState}>
            Export state
        </Button>
    )
}
