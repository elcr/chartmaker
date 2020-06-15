import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToDeleteActiveChart'>


export const DeleteActiveChartButton: FunctionComponent<Props> = ({ dispatch }) => {
    function deleteActiveChart() {
        dispatch({ tag: 'PromptToDeleteActiveChart' })
    }

    return (
        <button onClick={deleteActiveChart}>
            Delete
        </button>
    )
}
