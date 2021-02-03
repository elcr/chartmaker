import { render } from 'react-dom'

import type { ChartShape } from '@/types'
import { EditorChart } from '@/components/EditorChart'

import { RenderContainer, ignore, createTestNamedAlbums } from '../utils'


jest.mock('@/components/EditorAlbumRow')
jest.mock('@/components/EditorAlbumTitleGroup')
jest.mock('@/components/Chart')


const container = new RenderContainer()


test.each<[ string, ChartShape, number, number, number | undefined ]>([
    [ 'Test chart', { tag: 'Top', size: 100 }, 1, 2, 1 ],
    [ 'Test chart 2', { tag: 'Collage' }, 3, 4, undefined ],
])('renders chart with editor rows and titles', (name, shape, rowsX, rowsY, highlighted) => {
    render(
        <EditorChart albums={createTestNamedAlbums(5)}
            name={name}
            shape={shape}
            rowsX={rowsX}
            rowsY={rowsY}
            innerRef={ignore}
            dispatch={ignore}
            highlighted={highlighted}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
