import { h, FunctionComponent } from 'preact'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { Image } from './Image'


type Props = {
    album: Album
    sizeRem: number
    onDragStart: (event: DragEvent) => void
    onDragOver?: (event: DragEvent) => void
    onDragEnter?: (event: DragEvent) => void
    onDrop?: (event: DragEvent) => void
    overlayclass?: string
}


const baseContainerStyle = css({
    position: 'relative',
    backgroundColor: 'white',
    margin: '0.15rem'
})


const imageStyle = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
})


const baseOverlayStyle = cx(
    imageStyle,
    css({ zIndex: 10 })
)


export const AlbumCover: FunctionComponent<Props> = ({
    album,
    sizeRem,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDrop,
    children,
    overlayclass
}) => {
    const overlayStyle = cx(baseOverlayStyle, overlayclass)

    const containerStyle = cx(
        baseContainerStyle,
        css({
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
            [`:not(:hover) .${overlayStyle}`]: {
                display: 'none'
            }
        })
    )


    const image = album.placeholder
        ? null
        : <Image class={imageStyle}
            url={album.url}
            alt={album.name}
            title={album.name}/>

    return (
        <div class={containerStyle}
                draggable={!album.placeholder}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}>
            {image}
            <div class={overlayStyle}>
                {children}
            </div>
        </div>
    )
}
