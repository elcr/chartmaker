import type { FC } from 'react'

import type { EditorAlbumTitleGroupProps } from '@/components/EditorAlbumTitleGroup'


export const EditorAlbumTitleGroup: FC<EditorAlbumTitleGroupProps> = ({ group, highlighted }) => {
    const json = JSON.stringify(group)
    return (
        <div className='mock-editor-album-title-group'>
            {`Albums: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
