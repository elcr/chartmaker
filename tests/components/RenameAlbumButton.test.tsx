import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { RenameAlbumButton, RenameAlbumButtonProps } from '@/components/RenameAlbumButton'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/AlbumActionButton')


const container = new RenderContainer()


type ActionParams = Parameters<RenameAlbumButtonProps['dispatch']>;


test('renders album action button', () => {
    render(
        <RenameAlbumButton dispatch={ignore} id={123}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('clicking dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

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
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'PromptToRenameAlbum',
        id: 456
    })
})
