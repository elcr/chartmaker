import React from 'react'
import { render } from 'react-dom'

import { AlbumTitle } from '@/components/AlbumTitle'

import { RenderContainer, ignore } from '../utils'


jest.mock('@/components/RenameAlbumButton')
jest.mock('@/components/DeleteAlbumButton')


const container = new RenderContainer()


test('renders title and two buttons', () => {
    render(
        <AlbumTitle dispatch={ignore} id={123}>
            Test title
        </AlbumTitle>,
        container.element
    )

    expect(container.element).toMatchSnapshot()
})
