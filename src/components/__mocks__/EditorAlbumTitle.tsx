import type { FC } from 'react'

import type { EditorAlbumTitleProps } from '@/components/EditorAlbumTitle'


export const EditorAlbumTitle: FC<EditorAlbumTitleProps> = ({ album, highlighted }) => {
    const json = JSON.stringify(album)
    return (
        <div className='mock-editor-album-title'>
            {`Album: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
