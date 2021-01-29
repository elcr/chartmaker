import type { FC } from 'react'
import { css, cx } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'
import { SIDEBAR_LABEL_PADDING_SIZE, highlightBackgroundStyle } from '@/style'


const style = css({
    display: 'flex',
    [':not(:hover) button']: {
        display: 'none'
    }
})


const childrenStyle = css({
    marginRight: SIDEBAR_LABEL_PADDING_SIZE
})


export type AlbumTitleProps = DispatchProps & {
    id: number
    highlighted: boolean | undefined
}


export const AlbumTitle: FC<AlbumTitleProps> = ({
    dispatch,
    id,
    highlighted,
    children
}) => {
    function mouseEnter() {
        dispatch({
            tag: 'HighlightAlbum',
            targetID: id
        })
    }

    let className = style
    if (highlighted === false) {
        className = cx(style, highlightBackgroundStyle)
    }

    return (
        <div className={className} onMouseEnter={mouseEnter}>
            <span className={childrenStyle}>
                {children}
            </span>
            <RenameAlbumButton dispatch={dispatch} id={id}/>
            <DeleteAlbumButton dispatch={dispatch} id={id}/>
        </div>
    )
}
