import type { FC } from 'react'
import { css } from 'emotion'

import { SidebarGroup } from '@/components/SidebarGroup'
import type { DispatchProps } from '@/reducer'
import { LoadStateButton } from '@/components/LoadStateButton'
import { SaveStateButton } from '@/components/SaveStateButton'
import { CopyLinkButton } from '@/components/CopyLinkButton'


const outerStyle = css({
    display: 'flex',
    justifyContent: 'space-between'
})


const innerStyle = css({
    display: 'flex'
})


export type LoadSaveButtonsProps = DispatchProps


export const LoadSaveButtons: FC<LoadSaveButtonsProps> = ({ dispatch }) =>
    <SidebarGroup className={outerStyle}>
        <div className={innerStyle}>
            <LoadStateButton dispatch={dispatch}/>
            <SaveStateButton dispatch={dispatch}/>
        </div>
        <CopyLinkButton dispatch={dispatch}/>
    </SidebarGroup>
