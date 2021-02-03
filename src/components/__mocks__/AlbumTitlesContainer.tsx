import type { FC } from 'react'


import type { AlbumTitlesContainerProps } from '@/components/AlbumTitlesContainer'


export const AlbumTitlesContainer: FC<AlbumTitlesContainerProps> = ({ children }) =>
    <div className='mock-album-titles-container'>
        {children}
    </div>
