import type { ChartProps } from '@/components/Chart'


export function Chart<TNamedAlbum, TPlaceholderAlbum>({
    albums,
    name,
    rowsX,
    rowsY,
    shape,
    albumRowComponent: AlbumRowComponent,
    titleGroupComponent: TitleGroupComponent
}: ChartProps<TNamedAlbum, TPlaceholderAlbum>) {
    const albumsJSON = JSON.stringify(albums, undefined, 2)
    const shapeJSON = JSON.stringify(shape)
    return (
        <div className='mock-chart'>
            {`Albums: ${albumsJSON}`}
            {`Name: ${name}`}
            {`Rows X: ${rowsX}`}
            {`Rows Y: ${rowsY}`}
            {`Shape: ${shapeJSON}`}
            <AlbumRowComponent albums={[]} size='Mock chart size'/>
            <TitleGroupComponent group={[]}/>
        </div>
    )
}
