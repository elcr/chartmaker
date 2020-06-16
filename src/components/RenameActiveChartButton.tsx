import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { Button } from './Button'
import { SIDEBAR_ITEM_PADDING_SIZE } from '../style'


type Props = DispatchProps<'PromptToRenameActiveChart'>


const style = css({
    margin: `0 ${SIDEBAR_ITEM_PADDING_SIZE}`
})


export const RenameActiveChartButton: FunctionComponent<Props> = ({ dispatch }) => {
    function renameActiveChart() {
        dispatch({ tag: 'PromptToRenameActiveChart' })
    }

    return (
        <Button class={style} onClick={renameActiveChart}>
            Rename
        </Button>
    )
}
