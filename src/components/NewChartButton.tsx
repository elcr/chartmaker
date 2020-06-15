import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptForNewChart'>


export const NewChartButton: FunctionComponent<Props> = ({ dispatch }) => {
    function addNewChart() {
        dispatch({ tag: 'PromptForNewChart' })
    }

    return (
        <button onClick={addNewChart}>
            New
        </button>
    )
}
