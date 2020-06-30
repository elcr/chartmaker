import { css, cx } from 'emotion'


export const BACKGROUND_COLOUR = 'black'
export const TEXT_COLOUR = 'white'
export const ERROR_TEXT_COLOUR = 'red'
export const BORDER = `1px solid ${TEXT_COLOUR}`
export const FONT_SIZE = '0.875rem'
export const TITLES_FONT_SIZE = '0.75rem'
export const VERY_LARGE_ALBUM_SIZE = '9rem'
export const LARGE_ALBUM_SIZE = '7.4rem'
export const MEDIUM_ALBUM_SIZE = '6.25rem'
export const SMALL_ALBUM_SIZE = '4.75rem'
export const VERY_SMALL_ALBUM_SIZE = '4.3rem'
export const TINY_ALBUM_SIZE = '2.975rem'
export const CONTAINER_PADDING_SIZE = '1rem'
export const TITLES_PADDING_SIZE = '0.5rem'
export const ALBUM_PADDING_SIZE = '0.15rem'
export const ALBUM_BUTTONS_PADDING_SIZE = '0.5rem'
export const SIDEBAR_WIDTH = '18.5rem'
export const SIDEBAR_ITEM_PADDING_SIZE = '0.5rem'
export const SIDEBAR_LABEL_PADDING_SIZE = '0.25rem'


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
