import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToRenameActiveChart'>


const style = css({
    margin: '0 0.5rem'
})


export const RenameActiveChartButton: FunctionComponent<Props> = ({ dispatch }) => {
    function renameActiveChart() {
        dispatch({ tag: 'PromptToRenameActiveChart' })
    }

    return (
        <button class={style} onClick={renameActiveChart}>
            Rename
        </button>
    )
}
