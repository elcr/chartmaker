import type { FC } from 'react'

import type { AlbumTitleProps } from '@/components/AlbumTitle'


export const AlbumTitle: FC<AlbumTitleProps> = ({ id, highlighted, name, children }) =>
    <div className='mock-album-title'>
        {`ID: ${id}`}
        {`Name: ${name}`}
        {`Highlighted: ${highlighted}`}
        {children}
    </div>
