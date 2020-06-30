import { h, FunctionComponent, JSX } from 'preact'
import { css, cx } from 'emotion'

import { Album } from '../state'
import { TEXT_COLOUR, ALBUM_PADDING_SIZE } from '../style'


type Props = {
    album: Album
    size: string
    onDragStart: (event: DragEvent) => void
    onDragOver?: (event: DragEvent) => void
    onDragEnter?: (event: DragEvent) => void
    onDrop?: (event: DragEvent) => void
    overlayClass?: string
}


const baseContainerStyle = css({
    position: 'relative',
    backgroundColor: TEXT_COLOUR,
    margin: ALBUM_PADDING_SIZE
})


const imageStyle = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%'
})


const baseOverlayStyle = cx(
    imageStyle,
    css({ zIndex: 10 })
)


export const AlbumCover: FunctionComponent<Props> = ({
    album,
    size,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDrop,
    children,
    overlayClass
}) => {
    const overlayStyle = cx(baseOverlayStyle, overlayClass)
    const containerStyle = cx(
        baseContainerStyle,
        css({
            width: size,
            height: size,
            [`:not(:hover) .${overlayStyle}`]: {
                display: 'none'
            }
        })
    )

    let image: JSX.Element | undefined
    if (!album.placeholder) {
        image = (
            <img class={imageStyle}
                src={album.url}
                alt={album.name}
                crossOrigin='anonymous'/>
        )
    }

    return (
        <div class={containerStyle}
                draggable={!album.placeholder}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}
                title={album.placeholder ? undefined : album.name}>
            {image}
            <div class={overlayStyle}>
                {children}
            </div>
        </div>
    )
}
