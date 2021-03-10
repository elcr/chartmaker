import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { AlbumTitle } from '@/components/AlbumTitle'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '@/test-utils/utils'


const container = new RenderContainer()


test('renders title and children', () => {
    render(
        <AlbumTitle dispatch={ignore} id={123} name='Test name' highlighted={null}>
            Test children
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ 123, 456 ])('has reduced opacity when highlighted is not id', highlighted => {
    render(
        <AlbumTitle dispatch={ignore} id={123} name='Test name' highlighted={highlighted}>
            Test children
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test.each([ 123, 456, null ])('dispatches highlight action on mouse enter', highlighted => {
    const mock = jest.fn<[], [ Action ]>()

    render(
        <AlbumTitle dispatch={mock} id={123} name='Test name' highlighted={highlighted}>
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
