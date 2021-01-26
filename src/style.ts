import { css, cx } from 'emotion'

import { Colour, Border, Size } from '@/types'


export const BACKGROUND_COLOUR = 'black' as Colour
export const TEXT_COLOUR = 'white' as Colour
export const ERROR_TEXT_COLOUR = 'red' as Colour
export const BORDER = `1px solid ${TEXT_COLOUR}` as Border
export const FONT_SIZE = '0.875rem' as Size
export const TITLES_FONT_SIZE = '0.8rem' as Size
export const VERY_LARGE_ALBUM_SIZE = '16rem' as Size
export const LARGE_ALBUM_SIZE = '13.2rem' as Size
export const MEDIUM_ALBUM_SIZE = '11.25rem' as Size
export const SMALL_ALBUM_SIZE = '8.6rem' as Size
export const VERY_SMALL_ALBUM_SIZE = '7.75rem' as Size
export const TINY_ALBUM_SIZE = '5.4rem' as Size
export const CONTAINER_PADDING_SIZE = '1rem' as Size
export const TITLES_PADDING_SIZE = '0.5rem' as Size
export const ALBUM_PADDING_SIZE = '0.15rem' as Size
export const ALBUM_BUTTONS_PADDING_SIZE = '0.5rem' as Size
export const SIDEBAR_WIDTH = '20rem' as Size
export const SIDEBAR_ITEM_PADDING_SIZE = '0.5rem' as Size
export const SIDEBAR_LABEL_PADDING_SIZE = '0.25rem' as Size


export const buttonStyle = css({
    background: BACKGROUND_COLOUR,
    color: TEXT_COLOUR,
    border: BORDER,
    padding: SIDEBAR_LABEL_PADDING_SIZE
})


export const inputStyle = cx(
    buttonStyle,
    css({
        width: '100%'
    })
)
