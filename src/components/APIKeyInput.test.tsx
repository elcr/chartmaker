import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { APIKeyInput, id } from '@/components/APIKeyInput'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '@/test-utils/utils'


jest.mock('@/components/SidebarGroup')
jest.mock('@/components/Label')
jest.mock('@/components/ControlledInput')


const container = new RenderContainer()


test('renders labelled input', () => {
    render(
        <APIKeyInput dispatch={ignore} apiKey='test api key'/>,
        container.element
    )
    expect(container.element).toMatchSnapshot()
})


test('dispatches action on input change', () => {
    const mock = jest.fn<void, [ Action ]>()
    render(
        <APIKeyInput dispatch={mock} apiKey='test api key'/>,
        container.element
    )

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
