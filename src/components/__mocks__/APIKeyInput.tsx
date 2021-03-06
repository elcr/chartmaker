import type { FC } from 'react'

import type { APIKeyInputProps } from '@/components/APIKeyInput'


export const APIKeyInput: FC<APIKeyInputProps> = ({ apiKey }) =>
    <div className='mock-api-key-input'>
        {`API Key: ${apiKey}`}
    </div>
