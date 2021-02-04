import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type CopyLinkButtonProps = DispatchProps


export const CopyLinkButton: FC<CopyLinkButtonProps> = ({ dispatch }) => {
    function copyLink() {
        dispatch({ tag: 'CopyActiveChartLink' })
    }

    return (
        <Button onClick={copyLink}>
            Copy link
        </Button>
    )
}
