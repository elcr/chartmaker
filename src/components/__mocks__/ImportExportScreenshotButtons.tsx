import type { FC } from 'react'

import type { ImportExportScreenshotButtonsProps } from '@/components/ImportExportScreenshotButtons'


export const ImportExportScreenshotButtons: FC<ImportExportScreenshotButtonsProps> = ({
    screenshotState
}) => {
    const json = JSON.stringify(screenshotState)
    return (
        <div className='mock-import-export-screenshot-buttons'>
            {`Screenshot state: ${json}`}
        </div>
    )
}
