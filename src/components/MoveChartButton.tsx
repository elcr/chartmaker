import React, { FC } from 'react'

import { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type MoveChartButtonProps = DispatchProps & {
    direction: 'Up' | 'Down'
    disabled: boolean
}


export const MoveChartButton: FC<MoveChartButtonProps> = ({
    dispatch,
    direction,
    disabled,
    children
}) => {
    function moveChart() {
        dispatch({ tag: 'MoveActiveChart', direction })
    }

    return (
        <Button disabled={disabled} onClick={moveChart}>
            {children}
        </Button>
    )
}
