import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToSelectJSONToImport'>


const style = css({
    marginRight: '0.5rem'
})


export const ImportStateButton: FC<Props> = ({ dispatch }) => {
    function PromptToSelectJSONToImport() {
        dispatch({ tag: 'PromptToSelectJSONToImport' })
    }

    return (
        <button className={style} onClick={PromptToSelectJSONToImport}>
            Import charts
        </button>
    )
}
