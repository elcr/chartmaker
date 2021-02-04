import type { FC } from 'react'

import type { EditorAlbumRowsProps } from '@/components/EditorAlbumRows'


export const EditorAlbumRows: FC<EditorAlbumRowsProps> = ({
    rows,
    highlighted
}) => {
    const json = JSON.stringify(rows)
    return (
        <div className='mock-editor-album-rows'>
            {`Rows: ${json}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
