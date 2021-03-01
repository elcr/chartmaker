import { forwardRef, PropsWithChildren } from 'react'
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
}


export const Chart = forwardRef<HTMLElement, PropsWithChildren<ChartProps>>(
    ({ name, children }, ref) =>
        <main ref={ref} className={outContainerStyle}>
            <h1>{name}</h1>
            <div className={innerContainerStyle}>
                {children}
            </div>
        </main>
)
