import React, { FC } from 'react'
import { css } from 'emotion'


type Props = {
    titles: string[]
}


const style = css({
    fontStyle: 'monospace',
    marginBottom: '1rem'
})


export const TitleGroup: FC<Props> = ({ titles }) => {
    const titleElements = titles.map(title =>
        <div key={title}>
            {title}
        </div>
    )
    return (
        <div className={style}>
            {titleElements}
        </div>
    )
}
