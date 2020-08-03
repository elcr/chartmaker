import React, { FC } from 'react'
import { css } from 'emotion'


type Props = {
    onClick: () => void
    title: string
}


const style = css({
    background: 'none',
    border: 0,
    padding: 0
})


export const AlbumActionButton: FC<Props> = props =>
    <button {...props} className={style}/>
