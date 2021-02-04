import type { FC } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'
import { SIDEBAR_ITEM_PADDING_SIZE } from '@/style'


export type ViewerBackButtonProps = DispatchProps


const style = css({
    marginRight: SIDEBAR_ITEM_PADDING_SIZE
})


export const ViewerBackButton: FC<ViewerBackButtonProps> = ({ dispatch }) => {
    function routeToCharts() {
        dispatch({ tag: 'RouteToEditor' })
    }

    return (
        <Button className={style} onClick={routeToCharts}>
            Back
        </Button>
    )
}
