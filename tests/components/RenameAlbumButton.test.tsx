import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { RenameAlbumButton } from '@/components/RenameAlbumButton'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/AlbumActionButton')


const container = new RenderContainer()


test('renders album action button', () => {
    render(
        <RenameAlbumButton dispatch={ignore} id={123}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('clicking dispatches action', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <RenameAlbumButton dispatch={mock} id={456}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'click',
            container.element?.querySelector('[title="Rename"]')
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'PromptToRenameAlbum',
        id: 456
    })
})
