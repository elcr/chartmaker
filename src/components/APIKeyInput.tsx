import React, { FC } from 'react'

import { DispatchProps } from '@/reducer'
import { SidebarGroup } from '@/components/SidebarGroup'
import { Label } from '@/components/Label'
import { ControlledInput } from '@/components/ControlledInput'


export const id = 'apiKeyInput'


type Props = DispatchProps<'UpdateAPIKey'> & {
    apiKey: string
}


export const APIKeyInput: FC<Props> = ({ dispatch, apiKey }) => {
    function updateAPIKey(apiKey: string) {
        dispatch({
            tag: 'UpdateAPIKey',
            apiKey
        })
    }

    return (
        <SidebarGroup>
            <Label target={id}>
                Last.fm API key
            </Label>
            <ControlledInput id={id}
                type='password'
                value={apiKey}
                onChange={updateAPIKey}/>
        </SidebarGroup>
    )
}


export default APIKeyInput
