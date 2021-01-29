import type { FC } from 'react'
import { css } from 'emotion'

import { SIDEBAR_LABEL_PADDING_SIZE } from '@/style'


export type LabelProps = {
    target: string
}


const style = css({
    marginBottom: SIDEBAR_LABEL_PADDING_SIZE
})


export const Label: FC<LabelProps> = ({ children, target }) =>
    <label className={style} htmlFor={target}>
        {children}
    </label>
