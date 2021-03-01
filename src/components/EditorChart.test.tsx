import { render } from 'react-dom'

import type { ChartShape } from '@/types'
import { EditorChart } from '@/components/EditorChart'

import { RenderContainer, ignore, createTestNamedAlbums } from '../utils'


jest.mock('@/components/EditorAlbumRowsContainer')
jest.mock('@/components/EditorAlbumTitlesContainer')
jest.mock('@/components/Chart')


const container = new RenderContainer()

const albums = createTestNamedAlbums(100).map((album, index) =>
    index % 3 === 0
        ? album.id
        : album
)


test.each<[ string, ChartShape, number, number, number | undefined ]>([
    [ 'Test chart', { tag: 'Top', size: 100 }, 10, 10, 1 ],
    [ 'Test chart 2', { tag: 'Top', size: 42 }, 10, 10, 2 ],
    [ 'Test chart 3', { tag: 'Top', size: 40 }, 10, 10, undefined ],
    [ 'Test chart 4', { tag: 'Collage' }, 4, 5, undefined ],
    [ 'Test chart 5', { tag: 'Collage' }, 10, 10, undefined ],
])('renders chart with editor rows and titles', (name, shape, rowsX, rowsY, highlighted) => {
    render(
        <EditorChart albums={albums}
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
