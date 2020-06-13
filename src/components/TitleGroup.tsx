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
    const titleElements = titles.map((title, index) =>
        <div key={index}>
            {title}
        </div>
    )
    return (
        <div className={style}>
            {titleElements}
        </div>
    )
}
