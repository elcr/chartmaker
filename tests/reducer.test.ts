import { SideEffectUpdate, update, noUpdate } from 'react-use-side-effect-reducer'

import { reducer, Action } from '@/reducer'
import { search, SearchResultAlbum } from '@/api'
import { State, SearchState } from '@/types'

import { createTestState, createTestNamedAlbums } from './utils'


type ActionParams = [ Action ]


jest.mock('@/api')
const dispatchMock = jest.fn<void, ActionParams>()
const searchMock = search as jest.MockedFunction<typeof search>
afterEach(jest.resetAllMocks)

const state = createTestState()


test('UpdateAPIKey', () => {
    const apiKey = 'New API key'
    const result = reducer(
        createTestState(),
        { tag: 'UpdateAPIKey', apiKey }
    )
    expect(result).toMatchSnapshot()
})


test('UpdateActiveChart', () => {
    const activeChartIndex = 123
    const result = reducer(
        createTestState(),
        {
            tag: 'UpdateActiveChart',
            index: activeChartIndex
        }
    )
    expect(result).toMatchSnapshot()
})


describe('PromptForNewChart', () => {
    // jsdom doesn't implement prompt so jest.spyOn can't be used here
    const promptMock = jest.fn<string | null, [ string | undefined, string | undefined ]>()
    beforeAll(() => global.prompt = promptMock)
    afterEach(() => promptMock.mockRestore())
    afterAll(() => delete global.prompt)

    test('cancelling the prompt dispatches nothing', async () => {
        promptMock.mockImplementation(() => null)

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test('entering nothing in the prompt dispatches nothing', async () => {
        promptMock.mockImplementation(() => '')

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test('entering name of existing chart dispatches name taken action', async () => {
        promptMock.mockImplementation(() => 'Test chart 1')

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowChartNameTakenMessage'
        })
    })

    test('entering unique name dispatches new chart action', async () => {
        const name = 'Test new chart'
        promptMock.mockImplementation(() => name)

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'AddNewChart',
            name
        })
    })
})


describe('ShowChartNameTakenMessage', () => {
    // likewise, it doesn't implement alert
    const alertMock = jest.fn<void, [ string ]>()
    beforeAll(() => global.alert = alertMock)
    afterEach(() => alertMock.mockRestore())
    afterAll(() => delete global.alert)

    test('calls alert', async () => {
        const result = reducer(state, { tag: 'ShowChartNameTakenMessage' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(alertMock).toHaveBeenCalledTimes(1)
        expect(alertMock).toHaveBeenCalledWith('A chart with that name already exists')
        expect(dispatchMock).not.toHaveBeenCalled()
    })
})


test('AddNewChart', () => {
    const result = reducer(
        state,
        {
            tag: 'AddNewChart',
            name: 'Test new chart'
        }
    )
    expect(result).toMatchSnapshot()
})


describe('PromptToRenameActiveChart', () => {
    const promptMock = jest.fn<string | null, [ string | undefined, string | undefined ]>()
    beforeAll(() => global.prompt = promptMock)
    afterEach(() => promptMock.mockRestore())
    afterAll(() => delete global.prompt)

    test('cancelling the prompt dispatches nothing', async () => {
        promptMock.mockImplementation(() => null)

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test('entering nothing in the prompt dispatches nothing', async () => {
        promptMock.mockImplementation(() => '')

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test('entering the same name as active chart in the prompt dispatches nothing', async () => {
        promptMock.mockImplementation(() => state.charts[state.activeChartIndex].name)

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test('entering name of other existing chart dispatches name taken action', async () => {
        const name = 'Other test chart'
        promptMock.mockImplementation(() => name)

        const stateWithExtraChart: State = {
            ...state,
            charts: [
                ...state.charts,
                { ...state.charts[0], name }
            ]
        }
        const result = reducer(
            stateWithExtraChart,
            { tag: 'PromptToRenameActiveChart' }
        )
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, stateWithExtraChart)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowChartNameTakenMessage'
        })
    })

    test('entering unique name dispatches rename action', async () => {
        const name = 'Renamed test chart'
        promptMock.mockImplementation(() => name)

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'RenameActiveChart',
            name
        })
    })
})


test.each<State>([
    state,
    createTestState({ charts: 2 }),
    {
        ...createTestState({ charts: 3 }),
        activeChartIndex: 2
    }
])('RenameActiveChart', state => {
    const name = 'Renamed test chart'
    const result = reducer(state, { tag: 'RenameActiveChart', name })
    expect(result).toMatchSnapshot()
})


describe('PromptToDeleteActiveChart', () => {
    const confirmMock = jest.fn<boolean, [ string | undefined ]>()
    beforeAll(() => global.confirm = confirmMock)
    afterEach(() => confirmMock.mockRestore())
    afterAll(() => delete global.confirm)

    test('declining the prompt dispatches nothing', async () => {
        confirmMock.mockImplementation(() => false)

        const result = reducer(state, { tag: 'PromptToDeleteActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(confirmMock).toHaveBeenCalledTimes(1)
        expect(confirmMock).toHaveBeenCalledWith('Really delete active chart? This cannot be undone')
        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test('accepting the prompt dispatches delete action', async () => {
        confirmMock.mockImplementation(() => true)

        const result = reducer(state, { tag: 'PromptToDeleteActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(confirmMock).toHaveBeenCalledTimes(1)
        expect(confirmMock).toHaveBeenCalledWith('Really delete active chart? This cannot be undone')
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'DeleteActiveChart'
        })
    })
})


describe('DeleteActiveChart', () => {
    test.each<State>([
        state,
        createTestState({ charts: 3 })
    ])('replaces active chart if only one chart, otherwise removes', state => {
        const result = reducer(state, { tag: 'DeleteActiveChart' })
        expect(result).toMatchSnapshot()
    })
})


describe('ImportStateFile', () => {
    test('read error dispatches error action', async () => {
        const fileTextMock = jest.fn<Promise<string>, []>(Promise.reject)
        const file: File = { text: fileTextMock } as any

        const result = reducer(state, { tag: 'ImportStateFile', file })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowInvalidStateImportMessage'
        })
    })

    test('json parse error dispatches error action', async () => {
        const fileTextMock = jest.fn<Promise<string>, []>(() =>
            Promise.resolve('{')
        )

        const result = reducer(state, {
            tag: 'ImportStateFile',
            file: { text: fileTextMock } as any
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowInvalidStateImportMessage'
        })
    })

    test('validation error dispatches error action', async () => {
        const fileTextMock = jest.fn<Promise<string>, []>(() =>
            Promise.resolve('{}')
        )

        const result = reducer(state, {
            tag: 'ImportStateFile',
            file: { text: fileTextMock } as any
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowInvalidStateImportMessage'
        })
    })

    test('validation success dispatches load state action', async () => {
        const state = createTestState({ albums: 100 })
        const fileTextMock = jest.fn<Promise<string>, []>(() => {
            const json = JSON.stringify(state)
            return Promise.resolve(json)
        })

        const result = reducer(state, {
            tag: 'ImportStateFile',
            file: { text: fileTextMock } as any
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'LoadState',
            state
        })
    })
})


describe('ShowInvalidStateImportMessage', () => {
    const alertMock = jest.fn<void, [ string ]>()
    beforeAll(() => global.alert = alertMock)
    afterEach(() => alertMock.mockRestore())
    afterAll(() => delete global.alert)

    test('shows alert', async () => {
        const result = reducer(state, { tag: 'ShowInvalidStateImportMessage' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(alertMock).toHaveBeenCalledTimes(1)
        expect(alertMock).toHaveBeenCalledWith('Selected file is invalid')
        expect(dispatchMock).not.toHaveBeenCalled()
    })
})


test('LoadState', () => {
    const newState = createTestState({ charts: 3 })
    const result = reducer(state, {
        tag: 'LoadState',
        state: newState
    })
    expect(result).toEqual(update(newState))
})


test.todo('PromptToExportState')


describe('CancelSearchRequest', () => {
    test.each<SearchState>([
        {
            tag: 'Complete',
            albums: [],
            query: ''
        },
        {
            tag: 'Error',
            message: '',
            query: ''
        },
        {
            tag: 'Waiting',
            query: ''
        }
    ])('no update when search request not in progress', search => {
        const result = reducer({ ...state, search }, { tag: 'CancelSearchRequest' })
        expect(result).toEqual(noUpdate)
    })

    test('changes search state to waiting and aborts request controller', async () => {
        const abortMock = jest.fn<void, []>()
        const state: State = {
            ...createTestState(),
            search: {
                tag: 'Loading',
                query: 'Test query',
                controller: { abort: abortMock } as any
            }
        }

        const result = reducer(state, { tag: 'CancelSearchRequest' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(abortMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).not.toHaveBeenCalled()
    })
})


describe('SendSearchRequest', () => {
    const abortControllerMock = jest.fn<AbortController, []>()
    beforeAll(() => global.AbortController = abortControllerMock)
    beforeEach(() =>
        abortControllerMock.mockImplementation(() => ({
            signal: 'Test signal'
        }) as any)
    )
    afterEach(() => abortControllerMock.mockReset())
    afterAll(() => delete global.AbortController)

    test.each<SearchState>([
        {
            tag: 'Loading',
            controller: undefined as any,
            query: 'Test query'
        },
        {
            tag: 'Complete',
            albums: [],
            query: ''
        },
        {
            tag: 'Error',
            message: '',
            query: ''
        },
        {
            tag: 'Waiting',
            query: ''
        }
    ])('no update when request already in progress or search query empty', search => {
        const result = reducer({ ...state, search }, { tag: 'SendSearchRequest' })
        expect(result).toEqual(noUpdate)
    })

    test('error when api key empty', () => {
        const result = reducer(
            {
                ...state,
                apiKey: ''
            },
            { tag: 'SendSearchRequest' }
        )
        expect(result).toMatchSnapshot()
    })

    test('side effect dispatches load state action on request success', async () => {
        const albums: SearchResultAlbum[] = []
        for (let index = 1; index < 4; index++) {
            albums.push({
                name: `Test album ${index}`,
                url: `https://test.com/${index}`
            })
        }

        searchMock.mockImplementation(() => Promise.resolve({ tag: 'Ok', albums }))

        const result = reducer(state, { tag: 'SendSearchRequest' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(searchMock).toHaveBeenCalledTimes(1)
        expect(searchMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock.mock.calls[0]).toMatchSnapshot()
    })

    test.each([
        404,
        500
    ])('side effect dispatches error action on request status error', async status => {
        searchMock.mockImplementation(() =>
            Promise.resolve({
                tag: 'StatusError',
                status
            })
        )

        const result = reducer(state, { tag: 'SendSearchRequest' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(searchMock).toHaveBeenCalledTimes(1)
        expect(searchMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock.mock.calls[0]).toMatchSnapshot()
    })

    test.each([
        'JSONDecodeError',
        'InvalidResponseData',
        'NetworkError'
    ] as const)('side effect dispatches error action on other request errors', async tag => {
        searchMock.mockImplementation(() => Promise.resolve({ tag }))

        const result = reducer(state, { tag: 'SendSearchRequest' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(searchMock).toHaveBeenCalledTimes(1)
        expect(searchMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock.mock.calls[0]).toMatchSnapshot()
    })

    test('side effect dispatches nothing when search cancelled', async () => {
        searchMock.mockImplementation(() => Promise.resolve({ tag: 'Cancelled' }))

        const result = reducer(state, { tag: 'SendSearchRequest' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(searchMock).toHaveBeenCalledTimes(1)
        expect(searchMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).not.toHaveBeenCalled()
    })
})


test.each<SearchState>([
    {
        tag: 'Complete',
        albums: [
            {
                placeholder: false,
                id: 123,
                name: 'Test search album',
                url: 'https://test.com'
            }
        ],
        query: 'Test complete query'
    },
    {
        tag: 'Error',
        message: 'Test error message',
        query: 'Test error query'
    },
    {
        tag: 'Loading',
        controller: 'Test controller' as any,
        query: 'Test loading query'
    },
    {
        tag: 'Waiting',
        query: 'Test waiting query'
    }
])('UpdateSearchState', searchState => {
    const result = reducer(state, {
        tag: 'UpdateSearchState',
        state: searchState
    })
    expect(result).toMatchSnapshot()
})


describe('UpdateSearchQuery', () => {
    test('no update when search state loading', () => {
        const result = reducer(
            {
                ...state,
                search: {
                    tag: 'Loading',
                    controller: 'Test controller' as any,
                    query: 'Test query'
                }
            },
            {
                tag: 'UpdateSearchQuery',
                query: 'Test new query'
            }
        )
        expect(result).toEqual(noUpdate)
    })

    test.each<SearchState>([
        {
            tag: 'Complete',
            albums: [
                {
                    placeholder: false,
                    id: 123,
                    name: 'Test search album',
                    url: 'https://test.com'
                }
            ],
            query: 'Test complete query'
        },
        {
            tag: 'Error',
            message: 'Test error message',
            query: 'Test error query'
        },
        {
            tag: 'Waiting',
            query: 'Test waiting query'
        }
    ])('update for other search states', searchState => {
        const result = reducer(
            {
                ...state,
                search: searchState
            },
            {
                tag: 'UpdateSearchQuery',
                query: 'Test new query'
            }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('DragChartAlbum', () => {
    test.each([ 123, 456 ])('no update when source and target ids are same', id => {
        const result = reducer(state, {
            tag: 'DragChartAlbum',
            sourceID: id,
            targetID: id
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 123, 456 ])('no update when album with source id cannot be found', id => {
        const result = reducer(state, {
            tag: 'DragChartAlbum',
            sourceID: id,
            targetID: 1
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 123, 456 ])('no update when album with target id cannot be found', id => {
        const result = reducer(state, {
            tag: 'DragChartAlbum',
            sourceID: 1,
            targetID: id,
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 5, 4 ])('inserts source before target when source id higher', id => {
        const result = reducer(
            createTestState({ albums: 5 }),
            {
                tag: 'DragChartAlbum',
                sourceID: id,
                targetID: id - 2
            }
        )
        expect(result).toMatchSnapshot()
    })

    test.each([ 5, 4 ])('inserts source after target when target id higher', id => {
        const result = reducer(
            createTestState({ albums: 5 }),
            {
                tag: 'DragChartAlbum',
                sourceID: id - 2,
                targetID: id
            }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('DropSearchAlbum', () => {
    test('no update when search state not complete', () => {
        const result = reducer(state, {
            tag: 'DropSearchAlbum',
            sourceID: 123,
            targetID: 456
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 123, 456 ])('no update when album with source id cannot be found', id => {
        const result = reducer(
            {
                ...state,
                search: {
                    ...state.search,
                    tag: 'Complete',
                    albums: []
                }
            },
            {
                tag: 'DropSearchAlbum',
                sourceID: id,
                targetID: 1
            }
        )
        expect(result).toEqual(noUpdate)
    })

    test.each([ 123, 456 ])('no update when album with target id cannot be found', id => {
        const result = reducer(
            {
                ...state,
                search: {
                    ...state.search,
                    tag: 'Complete',
                    albums: [
                        {
                            placeholder: false,
                            id: 1,
                            name: 'Test search album',
                            url: 'https://test.com'
                        }
                    ]
                }
            },
            {
                tag: 'DropSearchAlbum',
                sourceID: 1,
                targetID: id
            }
        )
        expect(result).toEqual(noUpdate)
    })

    test.each<[ number, number ]>([
        [ 4, 1 ],
        [ 5, 3 ]
    ])('replaces album at target id', (sourceID, targetID) => {
        const result = reducer(
            {
                ...state,
                search: {
                    ...state.search,
                    tag: 'Complete',
                    albums: [
                        {
                            placeholder: false,
                            id: 4,
                            name: 'Test search album 4',
                            url: 'https://test.com'
                        },
                        {
                            placeholder: false,
                            id: 5,
                            name: 'Test search album 5',
                            url: 'https://test.com'
                        }
                    ]
                }
            },
            {
                tag: 'DropSearchAlbum',
                sourceID,
                targetID
            }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('PromptToRenameAlbum', () => {
    const promptMock = jest.fn<string | null, [ string | undefined, string | undefined ]>()
    beforeAll(() => global.prompt = promptMock)
    afterEach(() => promptMock.mockRestore())
    afterAll(() => delete global.prompt)

    test.each([
        123,
        456,
        1,
        2
    ])('dispatches nothing when album with id not found or placeholder', async id => {
        const result = reducer(state, { tag: 'PromptToRenameAlbum', id })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(promptMock).not.toHaveBeenCalled()
        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test.each([
        null,
        '',
        ' '
    ])('dispatches nothing when prompt cancelled or nothing entered', async name => {
        promptMock.mockImplementation(() => name)

        const result = reducer(state, {
            tag: 'PromptToRenameAlbum',
            id: 1
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, {
            ...state,
            charts: [
                {
                    ...state.charts[0],
                    albums: createTestNamedAlbums(3)
                }
            ]
        })

        expect(promptMock).toHaveBeenCalledTimes(1)
        expect(promptMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).not.toHaveBeenCalled()
    })

    test.each([
        [ 1, 'Test renamed album' ],
        [ 2, 'Test other renamed album' ]
    ])('dispatches rename action', async (id, name) => {
        promptMock.mockImplementation(() => name)

        const result = reducer(state, {
            tag: 'PromptToRenameAlbum',
            id
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, {
            ...state,
            charts: [
                {
                    ...state.charts[0],
                    albums: createTestNamedAlbums(3)
                }
            ]
        })

        expect(promptMock).toHaveBeenCalledTimes(1)
        expect(promptMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'RenameAlbum',
            id,
            name
        })
    })
})


describe('RenameAlbum', () => {
    test.todo('no update when album with id not found')

    test.todo('no update when album with id is a placeholder')

    test.todo('renames album with id')
})


describe('DeleteAlbum', () => {
    test.todo('no update when album with id not found')

    test.todo('replaces album with id with a placeholder')
})


test.todo('UpdateScreenshotLoading')


describe('UpdateScreenshotScale', () => {
    test.todo('no update when screenshot in progress')

    test.todo('updates screenshot scale')
})


describe('TakeScreenshot', () => {
    test.todo('no update when screenshot in progress')

    test.todo('side effect downloads picture and dispatches action')
})


test.todo('UpdateChartShape')
