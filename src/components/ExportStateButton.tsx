import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToExportStateJSON'>


export const ExportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    function PromptToExportStateJSON() {
        dispatch({ tag: 'PromptToExportStateJSON' })
    }

    return (
        <button onClick={PromptToExportStateJSON}>
            Export charts
        </button>
    )
}
