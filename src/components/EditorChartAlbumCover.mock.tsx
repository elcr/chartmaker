import type { FC } from 'react'

import type { EditorChartAlbumCoverProps } from '@/components/EditorChartAlbumCover'


export const EditorChartAlbumCover: FC<EditorChartAlbumCoverProps> = ({ album, size, highlighted }) => {
    const json = JSON.stringify(album)
    return (
        <div className='mock-editor-chart-album-cover'>
            {`Album: ${json}`}
            {`Size: ${size}`}
            {`Highlighted: ${highlighted}`}
        </div>
    )
}
