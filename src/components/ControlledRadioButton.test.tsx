import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { ControlledRadioButton } from '@/components/ControlledRadioButton'

import { RenderContainer, ignore, fireEvent } from '@/test-utils/utils'


jest.mock('@/components/Label')


const container = new RenderContainer()


test('renders labelled radio button', () => {
    render(
        <ControlledRadioButton id='test-radio-button'
                checked
                onCheck={ignore}>
            Test children
        </ControlledRadioButton>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})


test('change event calls onCheck prop', () => {
    const mock = jest.fn<void, []>()

    render(
        <ControlledRadioButton id='test-radio-button'
                checked={false}
                onCheck={mock}>
            Test children
        </ControlledRadioButton>,
        container.element
    )

    act(() =>
        fireEvent(
            'change',
            container.element?.querySelector('input')
        )
    )

    expect(mock).toHaveBeenCalledTimes(1)
})
