import type { FC } from 'react'

import type { DeleteAlbumButtonProps } from '@/components/DeleteAlbumButton'


export const DeleteAlbumButton: FC<DeleteAlbumButtonProps> = ({ id }) =>
    <div className='mock-delete-album-button'>
        {`ID: ${id}`}
    </div>
