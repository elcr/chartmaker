import type { FC } from 'react'

import type { AlbumTitleProps } from '@/components/AlbumTitle'


export const AlbumTitle: FC<AlbumTitleProps> = ({ id, highlighted, children }) =>
    <div className='mock-album-title'>
        {`ID: ${id}`}
        {`Highlighted: ${highlighted}`}
        {children}
    </div>
