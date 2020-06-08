import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToSelectImportJSON'>


const style = css({
    marginRight: '0.5rem'
})


export const ImportStateButton: FC<Props> = ({ dispatch }) => {
    function promptToSelectImportJSON() {
        dispatch({ tag: 'PromptToSelectImportJSON' })
    }

    return (
        <button className={style} onClick={promptToSelectImportJSON}>
            Import charts
        </button>
    )
}
