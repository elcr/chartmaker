import React, { FC } from 'react'
import { css, cx } from 'emotion'


type Props = {
    colour: string
    onClick: () => void
    title: string
}


const baseStyle = css({
    cursor: 'pointer',
    userSelect: 'none'
})


export const AlbumActionButton: FC<Props> = ({ colour, ...props }) => {
    const style = cx(
        baseStyle,
        css({ color: colour })
    )

    return <div {...props} className={style}/>
}
