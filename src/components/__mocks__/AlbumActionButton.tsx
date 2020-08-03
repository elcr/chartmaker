import React, { FC } from 'react'

import { AlbumActionButtonProps } from '@/components/AlbumActionButton'


export const AlbumActionButton: FC<AlbumActionButtonProps> = props =>
    <div {...props} className='mock-album-action-button'/>
