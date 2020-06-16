import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import { Button } from './Button'
import { SIDEBAR_ITEM_PADDING_SIZE } from '../style'


type Props = DispatchProps<'PromptToSelectJSONToImport'>


const style = css({
    marginRight: SIDEBAR_ITEM_PADDING_SIZE
})


export const ImportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    function PromptToSelectJSONToImport() {
        dispatch({ tag: 'PromptToSelectJSONToImport' })
    }

    return (
        <Button class={style} onClick={PromptToSelectJSONToImport}>
            Import state
        </Button>
    )
}
