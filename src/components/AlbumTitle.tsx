import React, { FC } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '@/reducer'
import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'
import { SIDEBAR_LABEL_PADDING_SIZE } from '@/style'


const style = css({
    display: 'flex',
    [':not(:hover) button']: {
        display: 'none'
    }
})


const childrenStyle = css({
    marginRight: SIDEBAR_LABEL_PADDING_SIZE
})


export type AlbumTitleProps = DispatchProps<'PromptToRenameAlbum' | 'DeleteAlbum'> & {
    id: number
}


export const AlbumTitle: FC<AlbumTitleProps> = ({ dispatch, id, children }) =>
    <div className={style}>
        <span className={childrenStyle}>
            {children}
        </span>
        <RenameAlbumButton dispatch={dispatch} id={id}/>
        <DeleteAlbumButton dispatch={dispatch} id={id}/>
    </div>
