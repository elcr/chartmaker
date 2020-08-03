import React, { FC } from 'react'
import { css } from 'emotion'


export type AlbumActionButtonProps = {
    onClick: () => void
    title: string
}


const style = css({
    background: 'none',
    border: 0,
    padding: 0
})


export const AlbumActionButton: FC<AlbumActionButtonProps> = props =>
    <button {...props} className={style}/>
