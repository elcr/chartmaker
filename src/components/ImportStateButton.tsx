import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToSelectJSONToImport'>


const style = css({
    marginRight: '0.5rem'
})


export const ImportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    function PromptToSelectJSONToImport() {
        dispatch({ tag: 'PromptToSelectJSONToImport' })
    }

    return (
        <button class={style} onClick={PromptToSelectJSONToImport}>
            Import charts
        </button>
    )
}
