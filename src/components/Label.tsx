import React, { FC } from 'react'
import { css } from 'emotion'


type Props = {
    target: string
}


const style = css({
    marginBottom: '0.25rem'
})


export const Label: FC<Props> = ({ children, target }) =>
    <label className={style} htmlFor={target}>
        {children}
    </label>
