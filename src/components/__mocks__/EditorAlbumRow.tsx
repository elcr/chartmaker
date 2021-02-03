import type { FC } from 'react'

import type { EditorAlbumRowProps } from '@/components/EditorAlbumRow'


export const EditorAlbumRow: FC<EditorAlbumRowProps> = ({ albums, size, highlighted }) => {
    const json = JSON.stringify(albums)
    return (
        <div className='mock-editor-album-title'>
            {`Albums: ${json}`}
            {`Size: ${size}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
