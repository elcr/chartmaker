import React, { FC } from 'react'
import { css } from 'emotion'


type Props = {
    url: string
    alt?: string
    title?: string
}


const style = css({
    maxWidth: '100%'
})


export const Image: FC<Props> = ({ url, ...props }) =>
    <img {...props} className={style} src={url} loading='lazy'/>
