import type { FC } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { CONTAINER_PADDING_SIZE } from '@/style'


export const id = 'rows'


const style = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: CONTAINER_PADDING_SIZE
})


export type AlbumRowsContainerProps = DispatchProps


export const AlbumRowsContainer: FC<AlbumRowsContainerProps> = ({ dispatch, children }) => {
    function mouseLeave() {
        dispatch({ tag: 'UnhighlightAlbum' })
    }

    return (
        <div id={id} className={style} onMouseLeave={mouseLeave}>
            {children}
        </div>
    )
}
