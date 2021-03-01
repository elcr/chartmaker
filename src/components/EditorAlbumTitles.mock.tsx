import type { FC } from 'react'

import type { EditorAlbumTitlesProps } from '@/components/EditorAlbumTitles'


export const EditorAlbumTitles: FC<EditorAlbumTitlesProps> = ({
    groups,
    highlighted
}) => {
    const json = JSON.stringify(groups)
    return (
        <div className='mock-editor-album-titles'>
            {`Groups: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
