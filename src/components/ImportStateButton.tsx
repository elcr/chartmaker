import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'


type Props = DispatchProps<'PromptToSelectStateImportJSON'>


const style = css({
    marginRight: '0.5rem'
})


export const ImportStateButton: FC<Props> = ({ dispatch }) => {
    function importState() {
        dispatch({ tag: 'PromptToSelectStateImportJSON' })
    }

    return (
        <button className={style} onClick={importState}>
            Import charts
        </button>
    )
}
