// import { render } from 'react-dom'

// import { App } from '@/App'

// import { RenderContainer } from '@/test-utils/utils'


jest.mock('@/pages/Editor', () => require('@/pages/Editor.mock'))
jest.mock('@/pages/Viewer', () => require('@/pages/Viewer.mock'))


// const container = new RenderContainer()


test.todo('loads state from local storage')


test.todo('falls back to default state if none in local storage')


test.todo('immediately dispatches action with route')


test.todo('popstate events dispatch action')


test.todo('no longer dispatches action on popstate events after unmount')


test.todo('renders editor page for editor route')


test.todo('renders viewer page for viewer route')


test.todo('renders nothing while route still pending')
