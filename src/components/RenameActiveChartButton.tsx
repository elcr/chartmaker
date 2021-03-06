import type { FC } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'
import { SIDEBAR_ITEM_PADDING_SIZE } from '@/style'


export type RenameActiveChartButtonProps = DispatchProps


const style = css({
    margin: `0 ${SIDEBAR_ITEM_PADDING_SIZE}`
})


export const RenameActiveChartButton: FC<RenameActiveChartButtonProps> = ({ dispatch }) => {
    function renameActiveChart() {
        dispatch({ tag: 'PromptToRenameActiveChart' })
    }

    return (
        <Button className={style} onClick={renameActiveChart}>
            Rename
        </Button>
    )
}
