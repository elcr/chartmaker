import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { DeleteAlbumButton, DeleteAlbumButtonProps } from '@/components/DeleteAlbumButton'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/AlbumActionButton')


const container = new RenderContainer()


type ActionParams = Parameters<DeleteAlbumButtonProps['dispatch']>;


test('renders album action button', () => {
    render(
        <DeleteAlbumButton dispatch={ignore} id={123}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('clicking dispatches action', () => {
    const mock = jest.fn<void, ActionParams>()

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
    expect(mock).toHaveBeenCalledWith<ActionParams>({
        tag: 'DeleteAlbum',
        id: 456
    })
})
