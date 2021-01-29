import type { FC } from 'react'

import type { LabelProps } from '@/components/Label'


export const Label: FC<LabelProps> = ({ target, children }) =>
    <div className='mock-label'>
        {`Target: ${target}`}
        {children}
    </div>
