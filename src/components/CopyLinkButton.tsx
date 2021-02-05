import type { FC } from 'react'

import { Button } from '@/components/Button'
import type { Chart } from '@/types'
import { routeToHash } from '@/utils'


export type CopyLinkButtonProps = {
    chart: Chart
}


export const CopyLinkButton: FC<CopyLinkButtonProps> = ({ chart }) => {
    function copyLink() {
        const hash = routeToHash({ tag: 'Viewer', chart })
        navigator.clipboard.writeText(location.origin + location.pathname + hash)
    }

    return (
        <Button onClick={copyLink}>
            Copy link
        </Button>
    )
}
