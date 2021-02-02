import type { FC } from 'react'
import { css } from 'emotion'

import { TITLES_PADDING_SIZE, TITLES_FONT_SIZE } from '@/style'


const style = css({
    marginBottom: TITLES_PADDING_SIZE,
    fontSize: TITLES_FONT_SIZE
})


export const AlbumTitleGroup: FC = ({ children }) =>
    <div className={style}>
        {children}
    </div>
