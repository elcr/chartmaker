import type { FC } from 'react'

import type { EditorAlbumTitlesContainerProps } from '@/components/EditorAlbumTitlesContainer'


export const EditorAlbumTitlesContainer: FC<EditorAlbumTitlesContainerProps> = ({
    groups,
    highlighted
}) => {
    const json = JSON.stringify(groups)
    return (
        <div className='mock-editor-album-titles-container'>
            {`Groups: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
