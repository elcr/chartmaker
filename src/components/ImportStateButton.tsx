import { h, FunctionComponent, Fragment } from 'preact'
import { css } from 'emotion'
import { useRef } from 'preact/hooks'

import { DispatchProps } from '../reducer'
import { Button } from './Button'
import { SIDEBAR_ITEM_PADDING_SIZE } from '../style'


type Props = DispatchProps<'ImportStateFile'>


const inputStyle = css({
    display: 'none'
})


const buttonStyle = css({
    marginRight: SIDEBAR_ITEM_PADDING_SIZE
})


export const ImportStateButton: FunctionComponent<Props> = ({ dispatch }) => {
    const inputRef = useRef<HTMLInputElement>()

    function loadSelectedFile() {
        const file = inputRef.current?.files?.[0]
        if (file === undefined) {
            return
        }
        dispatch({ tag: 'ImportStateFile', file })
    }

    function clickInput() {
        inputRef.current?.click()
    }

    return (
        <Fragment>
            <input ref={inputRef}
                class={inputStyle}
                type='file'
                accept='application/json'
                onChange={loadSelectedFile}/>
            <Button class={buttonStyle} onClick={clickInput}>
                Import state
            </Button>
        </Fragment>
    )
}
