import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { AlbumTitle } from '@/components/AlbumTitle'

import { RenderContainer, ignore, fireEvent } from '../utils'
import { Action } from '@/reducer'


jest.mock('@/components/RenameAlbumButton')
jest.mock('@/components/DeleteAlbumButton')


const container = new RenderContainer()


test('renders title and two buttons', () => {
    render(
        <AlbumTitle dispatch={ignore} id={123} highlighted={undefined}>
            Test title
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ true, false ])('has reduced opacity when highlighted is false', highlighted => {
    render(
        <AlbumTitle dispatch={ignore} id={456} highlighted={highlighted}>
            Test title
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dispatches highlight action on mouse enter', () => {
    const mock = jest.fn<[], [ Action ]>()

    render(
        <AlbumTitle dispatch={mock} id={123} highlighted={undefined}>
            Test title
        </AlbumTitle>,
        container.element
    )

    act(() => fireEvent('mouseEnter', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'HighlightAlbum',
        targetID: 123
    })
})
