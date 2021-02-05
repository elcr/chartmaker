import type { FC } from 'react'

import { Button } from '@/components/Button'
import type { Chart } from '@/types'
import { routeToURL } from '@/utils'


export type CopyLinkButtonProps = {
    chart: Chart
}


export const CopyLinkButton: FC<CopyLinkButtonProps> = ({ chart }) => {
    function copyLink() {
        const url = routeToURL({ tag: 'Viewer', chart })
        navigator.clipboard.writeText(location.origin + url)
    }

    return (
        <Button onClick={copyLink}>
            Copy link
        </Button>
    )
}
