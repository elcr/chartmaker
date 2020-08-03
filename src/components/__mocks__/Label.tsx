import React, { FC } from 'react'

import { LabelProps } from '@/components/Label'


export const Label: FC<LabelProps> = ({ target, children }) =>
    <div className='mock-label'>
        {`Target: ${target}`}
        {children}
    </div>
