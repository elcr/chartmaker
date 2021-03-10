import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { AlbumActionButton } from '@/components/AlbumActionButton'

import { fireEvent, RenderContainer } from '@/test-utils/utils'


const container = new RenderContainer()


test('renders button that calls onClick prop on click event', () => {
    const mock = jest.fn<void, []>()

    render(
        <AlbumActionButton title='Test title' onClick={mock}>
            Test children
        </AlbumActionButton>,
        container.element
    )

    expect(container.element).toMatchSnapshot()

    act(() => fireEvent('click', container.element?.firstChild))

    expect(mock).toHaveBeenCalledTimes(1)
})
