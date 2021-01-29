import type { FC } from 'react'

import type { AlbumActionButtonProps } from '@/components/AlbumActionButton'


export const AlbumActionButton: FC<AlbumActionButtonProps> = props =>
    <div {...props} className='mock-album-action-button'/>
