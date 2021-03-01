import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import type { SearchState } from '@/types'
import { SearchBox, id } from '@/components/SearchBox'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


// no need to mock the ControlledForm because it has no styles or anything,
// it's just a plain form once rendered
jest.mock('@/components/SidebarGroup')
jest.mock('@/components/Label')
jest.mock('@/components/ControlledInput')


const container = new RenderContainer()


test.each<SearchState>([
    {
        tag: 'Waiting',
        query: 'Test query'
    },
    {
        tag: 'Loading',
        query: 'Test query',
        // only the reducer touches this field so it's ok
        controller: undefined as any
    },
    {
        tag: 'Error',
        query: 'Test query',
        message: 'Test error message'
    },
    {
        tag: 'Complete',
        query: 'Test query',
        // component does not touch the albums at all so no need to specify any
        albums: []
    }
])('renders form with labelled text input', searchState => {
    render(
        <SearchBox dispatch={ignore}
            searchState={searchState}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dispatches action on input change', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <SearchBox dispatch={mock}
            searchState={{ tag: 'Waiting', query: 'Test query' }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector(`#${id}`),
            { target: { value: 'New query' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UpdateSearchQuery',
        query: 'New query'
    })
})


test('dispatches action on form submit', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <SearchBox dispatch={mock}
            searchState={{ tag: 'Waiting', query: 'Test query' }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'submit',
            container.element?.querySelector(`form`)
        )
    )

    expect(mock).toHaveBeenCalledTimes(2)
    expect(mock).toHaveBeenNthCalledWith<[ Action ]>(
        1,
        { tag: 'CancelSearchRequest' }
    )
    expect(mock).toHaveBeenNthCalledWith<[ Action ]>(
        2,
        { tag: 'SendSearchRequest' }
    )
})
