import { createRef } from 'react'
import { render } from 'react-dom'

import { Chart } from '@/components/Chart'

import { RenderContainer } from '../utils'


const container = new RenderContainer()



test('renders header and children, passes ref', () => {
    const ref = createRef<HTMLElement>()

    render(
        <Chart innerRef={ref} name='Test chart'>
            Test children
        </Chart>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
    expect(ref.current).toBeInstanceOf(Element)
})


// test.each([ 40, 42, 100 ] as const)('renders with top shape', size => {
//     render(
//         <Chart albums={albums}
//             name={`Test top ${size} chart`}
//             shape={{ tag: 'Top', size }}
//             rowsX={10}
//             rowsY={10}
//             innerRef={ignore}
//             dispatch={ignore}
//             isNamedAlbum={isNamedAlbum}
//             albumRowComponent={TestAlbumRow}
//             titleGroupComponent={TestTitleGroup}/>,
//         container.element
//     )

//     expect(container.element).toMatchSnapshot()
// })


// test('renders with collage shape', () => {
//     render(
//         <Chart albums={albums}
//             name='Test 5x7 collage chart'
//             shape={{ tag: 'Collage' }}
//             rowsX={5}
//             rowsY={7}
//             innerRef={ignore}
//             dispatch={ignore}
//             isNamedAlbum={isNamedAlbum}
//             albumRowComponent={TestAlbumRow}
//             titleGroupComponent={TestTitleGroup}/>,
//         container.element
//     )

//     expect(container.element).toMatchSnapshot()
// })


// test('excludes placeholder albums from titles', () => {
//     const albumsWithPlaceholders: Album[] = albums.map((album, index) =>
//         index % 2 == 0
//             ? album
//             : album.id
//     )
//     render(
//         <Chart albums={albumsWithPlaceholders}
//             name='Test chart with placeholders'
//             shape={{ tag: 'Collage' }}
//             rowsX={5}
//             rowsY={5}
//             innerRef={ignore}
//             dispatch={ignore}
//             isNamedAlbum={isNamedAlbum}
//             albumRowComponent={TestAlbumRow}
//             titleGroupComponent={TestTitleGroup}/>,
//         container.element
//     )

//     expect(container.element).toMatchSnapshot()
// })


// test('passes ref', () => {
//     const ref = createRef<HTMLElement>()

//     render(
//         <Chart albums={albums}
//             name='Test 5x7 collage chart'
//             shape={{ tag: 'Collage' }}
//             rowsX={5}
//             rowsY={7}
//             innerRef={ref}
//             dispatch={ignore}
//             isNamedAlbum={isNamedAlbum}
//             albumRowComponent={TestAlbumRow}
//             titleGroupComponent={TestTitleGroup}/>,
//         container.element
//     )

//     expect(ref.current).toBeInstanceOf(Element)
// })


// test('dispatches unhighlight action on mouse leaving albums container', () => {
//     const mock = jest.fn<[], [ Action ]>()

//     render(
//         <Chart albums={albums}
//             name='Test 5x7 collage chart'
//             shape={{ tag: 'Collage' }}
//             rowsX={5}
//             rowsY={7}
//             innerRef={ignore}
//             dispatch={mock}
//             isNamedAlbum={isNamedAlbum}
//             albumRowComponent={TestAlbumRow}
//             titleGroupComponent={TestTitleGroup}/>,
//         container.element
//     )

//     act(() => {
//         debugger
//         fireEvent('mouseLeave', container.element?.querySelector(`#${rowsID}`))
//     })

//     expect(mock).toHaveBeenCalledTimes(1)
//     expect(mock).toHaveBeenCalledWith<[ Action ]>({
//         tag: 'UnhighlightAlbum'
//     })
// })


// test('dispatches unhighlight action on mouse leaving titles container', () => {
//     const mock = jest.fn<[], [ Action ]>()

//     render(
//         <Chart albums={albums}
//             name='Test 5x7 collage chart'
//             shape={{ tag: 'Collage' }}
//             rowsX={5}
//             rowsY={7}
//             innerRef={ignore}
//             dispatch={mock}
//             isNamedAlbum={isNamedAlbum}
//             albumRowComponent={TestAlbumRow}
//             titleGroupComponent={TestTitleGroup}/>,
//         container.element
//     )

//     act(() => fireEvent('mouseLeave', container.element?.querySelector(`#${titlesID}`)))

//     expect(mock).toHaveBeenCalledTimes(1)
//     expect(mock).toHaveBeenCalledWith<[ Action ]>({
//         tag: 'UnhighlightAlbum'
//     })
// })
