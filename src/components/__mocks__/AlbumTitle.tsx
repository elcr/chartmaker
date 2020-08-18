import React, { FC } from 'react'

import type { AlbumTitleProps } from '@/components/AlbumTitle'


export const AlbumTitle: FC<AlbumTitleProps> = ({ id, children }) =>
    <div className='mock-album-title'>
        {`ID: ${id}`}
        {children}
    </div>
