const mock: typeof import('@/components/APIKeyInput') = {
    id: 'apiKeyInput',

    APIKeyInput: ({ apiKey }) =>
        <div className='mock-api-key-input'>
            {`API Key: ${apiKey}`}
        </div>
}


export const APIKeyInput = mock.APIKeyInput
