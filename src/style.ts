import { css } from 'emotion'


export const BACKGROUND_COLOUR = 'black'
export const TEXT_COLOUR = 'white'
export const ERROR_TEXT_COLOUR = 'red'
export const BORDER = `1px solid ${TEXT_COLOUR}`
export const FONT_SIZE = '0.875rem'
export const VERY_LARGE_ROW_SIZE = '9rem'
export const LARGE_ROW_SIZE = '7.4rem'
export const MEDIUM_ROW_SIZE = '6.25rem'
export const SMALL_ROW_SIZE = '4.75rem'
export const CONTAINER_PADDING_SIZE = '1rem'
export const ALBUM_PADDING_SIZE = '0.15rem'
export const ALBUM_BUTTONS_PADDING_SIZE = '0.5rem'
export const SIDEBAR_WIDTH = '17rem'
export const SIDEBAR_ITEM_PADDING_SIZE = '0.5rem'
export const SIDEBAR_LABEL_PADDING_SIZE = '0.25rem'


export const inputStyle = css({
    background: BACKGROUND_COLOUR,
    color: TEXT_COLOUR,
    border: BORDER,
    padding: SIDEBAR_LABEL_PADDING_SIZE
})
