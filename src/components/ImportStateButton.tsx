import React, { FC, useRef } from 'react'
import { css } from 'emotion'

import { DispatchProps } from '@/reducer'
import { SIDEBAR_ITEM_PADDING_SIZE } from '@/style'
import Button from '@/components/Button'


type Props = DispatchProps<'ImportStateFile'>


const inputStyle = css({
    display: 'none'
})


const buttonStyle = css({
    marginRight: SIDEBAR_ITEM_PADDING_SIZE
})


const ImportStateButton: FC<Props> = ({ dispatch }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    function loadSelectedFile() {
        const file = inputRef.current?.files?.[0]
        if (file === undefined) {
            return
        }
        dispatch({
            tag: 'ImportStateFile',
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
                Import state
            </Button>
        </>
    )
}


export default ImportStateButton
