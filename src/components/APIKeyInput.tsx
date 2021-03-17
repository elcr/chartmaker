import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { SidebarGroup } from '@/components/SidebarGroup'
import { Label } from '@/components/Label'
import { ControlledInput } from '@/components/ControlledInput'


export const id = 'apiKeyInput'


export type APIKeyInputProps = DispatchProps & {
    apiKey: string
}


export const APIKeyInput: FC<APIKeyInputProps> = ({ dispatch, apiKey }) => {
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
