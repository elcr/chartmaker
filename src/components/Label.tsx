import React, { FC } from 'react'
import { css } from 'emotion'

import { SIDEBAR_LABEL_PADDING_SIZE } from '@/style'


type Props = {
    target: string
}


const style = css({
    marginBottom: SIDEBAR_LABEL_PADDING_SIZE
})


export const Label: FC<Props> = ({ children, target }) =>
    <label className={style} htmlFor={target}>
        {children}
    </label>
