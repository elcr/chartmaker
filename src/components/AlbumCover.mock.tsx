import { cx } from 'emotion'


const mock: typeof import('@/components/AlbumCover') = {
    AlbumCover: ({
        album,
        size,
        overlayClass,
        children,
        highlighted,
        ...props
    }) => {
        const json = JSON.stringify(album)
        const className = cx('mock-album-cover', overlayClass)
        return (
            <div {...props} className={className}>
                {`Album: ${json}`}
                {`Size: ${size}`}
                {`Highlighted: ${highlighted}`}
                {children}
            </div>
        )
    }
}


export const AlbumCover = mock.AlbumCover
