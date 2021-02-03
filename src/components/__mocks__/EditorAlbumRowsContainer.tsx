import type { FC } from 'react'

import type { EditorAlbumRowsContainerProps } from '@/components/EditorAlbumRowsContainer'


export const EditorAlbumRowsContainer: FC<EditorAlbumRowsContainerProps> = ({
    rows,
    highlighted
}) => {
    const json = JSON.stringify(rows)
    return (
        <div className='mock-editor-album-rows-container'>
            {`Rows: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
