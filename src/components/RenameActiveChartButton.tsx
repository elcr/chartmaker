import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '../reducer'
import Button from './Button'
import { SIDEBAR_ITEM_PADDING_SIZE } from '../style'


type Props = DispatchProps<'PromptToRenameActiveChart'>


const style = css({
    margin: `0 ${SIDEBAR_ITEM_PADDING_SIZE}`
})


const RenameActiveChartButton: FC<Props> = ({ dispatch }) => {
    function renameActiveChart() {
        dispatch({ tag: 'PromptToRenameActiveChart' })
    }

    return (
        <Button className={style} onClick={renameActiveChart}>
            Rename
        </Button>
    )
}


export default RenameActiveChartButton
