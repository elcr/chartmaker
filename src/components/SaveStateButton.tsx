import type { FC } from 'react'

import type { DispatchProps } from '@/reducer'
import { Button } from '@/components/Button'


export type SaveStateButtonProps = DispatchProps


export const SaveStateButton: FC<SaveStateButtonProps> = ({ dispatch }) => {
    function promptToSaveState() {
        dispatch({ tag: 'PromptToSaveState' })
    }

    return (
        <Button onClick={promptToSaveState}>
            Save state
        </Button>
    )
}
