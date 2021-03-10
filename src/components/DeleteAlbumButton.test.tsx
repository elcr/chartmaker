import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { DeleteAlbumButton } from '@/components/DeleteAlbumButton'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '@/test-utils/utils'


jest.mock('@/components/AlbumActionButton')


const container = new RenderContainer()


test('renders album action button', () => {
    render(
        <DeleteAlbumButton dispatch={ignore} id={123}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('clicking dispatches action', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <DeleteAlbumButton dispatch={mock} id={456}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'click',
            container.element?.querySelector('[title="Delete"]')
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'DeleteAlbum',
        id: 456
    })
})
