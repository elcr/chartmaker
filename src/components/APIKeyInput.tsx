import React, { FC } from 'react'

import { DispatchProps } from '../reducer'
import SidebarGroup from './SidebarGroup'
import Label from './Label'
import ControlledInput from './ControlledInput'


const id = 'apiKeyInput'


type Props = DispatchProps<'UpdateAPIKey'> & {
    apiKey: string
}


const APIKeyInput: FC<Props> = ({ dispatch, apiKey }) => {
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
