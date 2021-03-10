import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { AlbumTitlesContainer, id } from '@/components/AlbumTitlesContainer'
import type { Action } from '@/reducer'

import { fireEvent, RenderContainer } from '@/test-utils/utils'


const container = new RenderContainer()


test('renders children and dispatches on mouse leave', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <AlbumTitlesContainer dispatch={mock}>
            Test children
        </AlbumTitlesContainer>,
        container.element
    )

    expect(container.element).toMatchSnapshot()

    act(() => fireEvent('mouseLeave', container.element?.querySelector(`#${id}`)))

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UnhighlightAlbum'
    })
})
