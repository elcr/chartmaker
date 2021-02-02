import { FC, useRef, ChangeEvent } from 'react'
import { css } from 'emotion'

import type { DispatchProps } from '@/reducer'
import { SIDEBAR_ITEM_PADDING_SIZE } from '@/style'
import { Button } from '@/components/Button'


export type LoadStateButtonProps = DispatchProps


const inputStyle = css({
    display: 'none'
})


const buttonStyle = css({
    marginRight: SIDEBAR_ITEM_PADDING_SIZE
})


export const LoadStateButton: FC<LoadStateButtonProps> = ({ dispatch }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    function loadSelectedFile(event: ChangeEvent<HTMLInputElement>) {
        // files are accessed through the event rather than the ref for easier
        // mocking during testing
        const file = event.target.files?.[0]
        if (file === undefined) {
            return
        }
        dispatch({
            tag: 'LoadStateFile',
            file
        })
    }

    function clickInput() {
        inputRef.current?.click()
    }

    return (
        <>
            <input ref={inputRef}
                className={inputStyle}
                type='file'
                accept='application/json'
                onChange={loadSelectedFile}/>
            <Button className={buttonStyle} onClick={clickInput}>
                Load state
            </Button>
        </>
    )
}
