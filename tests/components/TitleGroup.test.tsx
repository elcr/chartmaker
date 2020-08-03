import React from 'react'
import { render } from 'react-dom'

import { TitleGroup } from '@/components/TitleGroup'

import { RenderContainer } from '../utils'


const container = new RenderContainer()


test('renders styled div', () => {
    render(
        <TitleGroup>
            Test children
        </TitleGroup>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
