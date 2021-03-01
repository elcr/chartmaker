import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { AlbumTitlesContainer, id } from '@/components/AlbumTitlesContainer'
import type { Action } from '@/reducer'

import { fireEvent, RenderContainer } from '../utils'


const container = new RenderContainer()


test('renders children and dispatches on mouse leave', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <AlbumTitlesContainer dispatch={mock}>
            Test children
        </AlbumTitlesContainer>,
        container.element
    )

    act(() => fireEvent('mouseLeave', container.element?.querySelector(`#${id}`)))

    expect(container.element).toMatchSnapshot()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UnhighlightAlbum'
    })
})
