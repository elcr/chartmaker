import React, { FC } from 'react'
import { css, cx } from 'emotion'


type Props = {
    url: string
    alt?: string
    title?: string
    className?: string
}


const style = css({
    maxWidth: '100%'
})


export const Image: FC<Props> = ({ url, className, ...props }) =>
    <img {...props}
        className={cx(style, className)}
        src={url}
        loading='lazy'/>
