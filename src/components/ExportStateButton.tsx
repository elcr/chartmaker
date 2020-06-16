import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'
import { Button } from './Button'


type Props = DispatchProps<'PromptToExportStateJSON'>


export const ExportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    function PromptToExportStateJSON() {
        dispatch({ tag: 'PromptToExportStateJSON' })
    }

    return (
        <Button onClick={PromptToExportStateJSON}>
            Export charts
        </Button>
    )
}
