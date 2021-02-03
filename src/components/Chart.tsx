import type { FC, Ref } from 'react'
import { css } from 'emotion'

import { CONTAINER_PADDING_SIZE, BORDER } from '@/style'


const outContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    padding: CONTAINER_PADDING_SIZE,
    border: BORDER
})


const innerContainerStyle = css({
    display: 'flex',
    alignItems: 'flex-start'
})


export type ChartProps = {
    name: string
    innerRef: Ref<HTMLElement>
}


export const Chart: FC<ChartProps> = ({ name, innerRef, children }) =>
    <main ref={innerRef} className={outContainerStyle}>
        <h1>{name}</h1>
        <div className={innerContainerStyle}>
            {children}
        </div>
    </main>
