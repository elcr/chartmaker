import type { FC } from 'react'
import { css, cx } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { SIDEBAR_LABEL_PADDING_SIZE, highlightBackgroundStyle } from '@/style'


const style = css({
    display: 'flex',
    [':not(:hover) > *:not(:first-child)']: {
        display: 'none'
    }
})


const labelStyle = css({
    marginRight: SIDEBAR_LABEL_PADDING_SIZE
})


export type AlbumTitleProps = DispatchProps & {
    id: number
    name: string
    highlighted: number | undefined
}


export const AlbumTitle: FC<AlbumTitleProps> = ({
    dispatch,
    id,
    name,
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
    if (highlighted !== undefined && id !== highlighted) {
        className = cx(style, highlightBackgroundStyle)
    }

    return (
        <div className={className} onMouseEnter={mouseEnter}>
            <span className={labelStyle}>
                {name}
            </span>
            {children}
        </div>
    )
}
