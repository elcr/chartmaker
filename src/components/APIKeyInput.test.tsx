import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { APIKeyInput, id } from '@/components/APIKeyInput'
import type { Action } from '@/reducer'

import { RenderContainer, fireEvent } from '@/test-utils/utils'


jest.mock('@/components/SidebarGroup', () => require('@/components/SidebarGroup.mock'))
jest.mock('@/components/Label', () => require('@/components/Label.mock'))
jest.mock('@/components/ControlledInput', () => require('@/components/ControlledInput.mock'))


const container = new RenderContainer()


test('renders labelled input and dispatches action on input change', () => {
    const mock = jest.fn<void, [ Action ]>()
    render(
        <APIKeyInput dispatch={mock} apiKey='test api key'/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector(`#${id}`),
            { target: { value: 'test new api key' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UpdateAPIKey',
        apiKey: 'test new api key'
    })
})
