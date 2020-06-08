import React, { FC } from 'react'
import { css } from 'emotion'


const style = css({
    ":not(:last-of-type)": {
        borderBottom: '1px solid white',
        paddingBottom: '1rem',
        marginBottom: '1rem'
    }
})


export const SidebarGroup: FC = ({ children }) =>
    <div className={style}>
        {children}
    </div>
