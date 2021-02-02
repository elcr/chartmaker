import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { AlbumTitle } from '@/components/AlbumTitle'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


const container = new RenderContainer()


test('renders title and children', () => {
    render(
        <AlbumTitle dispatch={ignore} id={123} name='Test name' highlighted={undefined}>
            Test children
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ true, false ])('has reduced opacity when highlighted is false', highlighted => {
    render(
        <AlbumTitle dispatch={ignore} id={456} name='Test name' highlighted={highlighted}>
            Test children
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dispatches highlight action on mouse enter', () => {
    const mock = jest.fn<[], [ Action ]>()

    render(
        <AlbumTitle dispatch={mock} id={123} name='Test name' highlighted={undefined}>
            Test children
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
