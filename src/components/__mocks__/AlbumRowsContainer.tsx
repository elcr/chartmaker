import type { FC } from 'react'


import type { AlbumRowsContainerProps } from '@/components/AlbumRowsContainer'


export const AlbumRowsContainer: FC<AlbumRowsContainerProps> = ({ children }) =>
    <div className='mock-album-rows-container'>
        {children}
    </div>
