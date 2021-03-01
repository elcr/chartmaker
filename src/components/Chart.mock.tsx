import type { FC } from 'react'

import type { ChartProps } from '@/components/Chart'


export const Chart: FC<ChartProps> = ({ name, children }) =>
    <div className='mock-chart'>
        {`Name: ${name}`}
        {children}
    </div>
