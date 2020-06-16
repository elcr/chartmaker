import { h, FunctionComponent } from 'preact'

import { DispatchProps } from '../reducer'
import { Button } from './Button'


type Props = DispatchProps<'PromptForNewChart'>


export const NewChartButton: FunctionComponent<Props> = ({ dispatch }) => {
    function addNewChart() {
        dispatch({ tag: 'PromptForNewChart' })
    }

    return (
        <Button onClick={addNewChart}>
            New
        </Button>
    )
}
