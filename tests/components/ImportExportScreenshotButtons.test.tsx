import type { MutableRefObject } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import {
    ImportExportScreenshotButtons,
    sliderID,
    buttonID
} from '@/components/ImportExportScreenshotButtons'
import type { ScreenshotState } from '@/types'
import type { Action } from '@/reducer'

import { RenderContainer, ignore, fireEvent } from '../utils'


jest.mock('@/components/Button')
jest.mock('@/components/ControlledSlider')
jest.mock('@/components/LoadStateButton')
jest.mock('@/components/SaveStateButton')
jest.mock('@/components/SidebarGroup')


const container = new RenderContainer()


test.each<ScreenshotState>([
    { loading: true, scale: 1 },
    { loading: false, scale: 2 },
])('renders slider and buttons', screenshotState => {
    render(
        <ImportExportScreenshotButtons dispatch={ignore}
            chartRef={{ current: null }}
            screenshotState={screenshotState}/>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('dispatches action when slider moved', () => {
    const mock = jest.fn<void, [ Action ]>()

    render(
        <ImportExportScreenshotButtons dispatch={mock}
            chartRef={{ current: null }}
            screenshotState={{ loading: false, scale: 1 }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector(`#${sliderID}`),
            { target: { value: '3' } }
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'UpdateScreenshotScale',
        scale: 3
    })
})


test('dispatches action when screenshot button clicked', () => {
    const mock = jest.fn<void, [ Action ]>()
    const ref: MutableRefObject<HTMLElement> = {
        current: container.element!
    }

    render(
        <ImportExportScreenshotButtons dispatch={mock}
            chartRef={ref}
            screenshotState={{ loading: false, scale: 1 }}/>,
        container.element
    )

    act(() =>
        fireEvent(
            'click',
            container.element?.querySelector(`#${buttonID}`)
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith<[ Action ]>({
        tag: 'TakeScreenshot',
        element: container.element!
    })
})
