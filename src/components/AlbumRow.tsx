import type { FC } from 'react'
import { css } from 'emotion'


const style = css({
    display: 'flex'
})


export const AlbumRow: FC = ({ children }) =>
    <div className={style}>
        {children}
    </div>
