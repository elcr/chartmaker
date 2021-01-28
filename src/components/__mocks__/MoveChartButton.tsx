import React, { FC } from 'react'

import { MoveChartButtonProps } from '@/components/MoveChartButton'


export const MoveChartButton: FC<MoveChartButtonProps> = ({ direction, disabled, children }) =>
    <div className='mock-move-chart-button'>
        {`Disabled: ${disabled}`}
        {`Direction: ${direction}`}
        {children}
    </div>
