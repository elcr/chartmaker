import { SideEffectUpdate, update, noUpdate } from 'react-use-side-effect-reducer'
import produce from 'immer'

import { reducer, Action } from '@/reducer'
import { search } from '@/api'
import type { State, SearchState, ChartShape, SearchAlbum } from '@/types'
import { MAX_SCREENSHOT_SCALE, MAX_COLLAGE_ROWS_X, MAX_COLLAGE_ROWS_Y } from '@/constants'

import { createTestState, createTestNamedAlbums } from './utils'


jest.mock('@/api')
const dispatchMock = jest.fn<void, [ Action ]>()
const searchMock = search as jest.MockedFunction<typeof search>
afterEach(jest.resetAllMocks)

const state = createTestState()


test('UpdateAPIKey', () => {
    const apiKey = 'New API key'
    const result = reducer(state, { tag: 'UpdateAPIKey', apiKey })
    expect(result).toMatchSnapshot()
})


test('UpdateActiveChart', () => {
    const activeChartIndex = 123
    const result = reducer(
        {
            ...state,
            highlightedID: 1
        },
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
    afterAll(() => delete (global as any).prompt)

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
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
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
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
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
    afterAll(() => delete (global as any).alert)

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
        {
            ...state,
            highlightedID: 1
        },
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
    afterAll(() => delete (global as any).prompt)

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
        promptMock.mockImplementation(() => state.charts[state.activeChartIndex]!.name)

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
                { ...state.charts[0]!, name }
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
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
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
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
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
    afterAll(() => delete (global as any).confirm)

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
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
            tag: 'DeleteActiveChart'
        })
    })
})


describe('DeleteActiveChart', () => {
    test.each<State>([
        state,
        createTestState({ charts: 3 })
    ])('replaces active chart if only one chart, otherwise removes', state => {
        const result = reducer(
            {
                ...state,
                highlightedID: 1
            },
            { tag: 'DeleteActiveChart' }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('MoveActiveChart', () => {
    test.each([ 'Up', 'Down' ] as const)('noUpdate when only one chart', direction => {
        const result = reducer(state, { tag: 'MoveActiveChart', direction })
        expect(result).toBe(noUpdate)
    })

    test('noUpdate when direction is up but chart is already at top', () => {
        const result = reducer(
            createTestState({ charts: 3 }),
            { tag: 'MoveActiveChart', direction: 'Up' }
        )
        expect(result).toBe(noUpdate)
    })

    test('noUpdate when direction is down but chart is already at bottom', () => {
        const result = reducer(
            {
                ...createTestState({ charts: 3 }),
                activeChartIndex: 2
            },
            { tag: 'MoveActiveChart', direction: 'Down' }
        )
        expect(result).toBe(noUpdate)
    })

    test.each([ 1, 2 ])('moves chart up', activeChartIndex => {
        const result = reducer(
            {
                ...createTestState({ charts: 3 }),
                activeChartIndex
            },
            { tag: 'MoveActiveChart', direction: 'Up' }
        )
        expect(result).toMatchSnapshot()
    })

    test.each([ 0, 1 ])('moves chart down', activeChartIndex => {
        const result = reducer(
            {
                ...createTestState({ charts: 3 }),
                activeChartIndex
            },
            { tag: 'MoveActiveChart', direction: 'Down' }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('LoadStateFile', () => {
    test('read error dispatches error action', async () => {
        const fileTextMock = jest.fn<Promise<string>, []>(Promise.reject)
        const file: File = { text: fileTextMock } as any

        const result = reducer(state, { tag: 'LoadStateFile', file })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
            tag: 'ShowInvalidStateImportMessage'
        })
    })

    test('json parse error dispatches error action', async () => {
        const fileTextMock = jest.fn<Promise<string>, []>(() =>
            Promise.resolve('{')
        )

        const result = reducer(state, {
            tag: 'LoadStateFile',
            file: { text: fileTextMock } as any
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
            tag: 'ShowInvalidStateImportMessage'
        })
    })

    test('validation error dispatches error action', async () => {
        const fileTextMock = jest.fn<Promise<string>, []>(() =>
            Promise.resolve('{}')
        )

        const result = reducer(state, {
            tag: 'LoadStateFile',
            file: { text: fileTextMock } as any
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
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
            tag: 'LoadStateFile',
            file: { text: fileTextMock } as any
        })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, state)

        expect(fileTextMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
            tag: 'LoadState',
            state
        })
    })
})


describe('ShowInvalidStateImportMessage', () => {
    const alertMock = jest.fn<void, [ string ]>()
    beforeAll(() => global.alert = alertMock)
    afterEach(() => alertMock.mockRestore())
    afterAll(() => delete (global as any).alert)

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


// TODO: extract to separate test suite to mock utils module
test.todo('PromptToSaveState')


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
        const testState: State = {
            ...state,
            search: {
                tag: 'Loading',
                query: 'Test query',
                controller: { abort: abortMock } as any
            }
        }

        const result = reducer(testState, { tag: 'CancelSearchRequest' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as SideEffectUpdate<State, Action>
        await sideEffect(dispatchMock, testState)

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
    afterAll(() => delete (global as any).AbortController)

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
        const albums: SearchAlbum[] = []
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
            sourceIndex: 0,
            targetID: 456
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 123, 456 ])('no update when album with source index cannot be found', id => {
        const result = reducer(
            {
                ...state,
                search: {
                    ...state.search,
                    tag: 'Complete',
                    albums: [
                        {
                            name: 'Test search album',
                            url: 'https://test.com'
                        }
                    ]
                }
            },
            {
                tag: 'DropSearchAlbum',
                sourceIndex: id,
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
                            name: 'Test search album',
                            url: 'https://test.com'
                        }
                    ]
                }
            },
            {
                tag: 'DropSearchAlbum',
                sourceIndex: 0,
                targetID: id
            }
        )
        expect(result).toEqual(noUpdate)
    })

    test.each<[ number, number ]>([
        [ 0, 1 ],
        [ 1, 3 ]
    ])('replaces album at target index', (sourceIndex, targetID) => {
        const result = reducer(
            {
                ...state,
                search: {
                    ...state.search,
                    tag: 'Complete',
                    albums: [
                        {
                            name: 'Test search album 4',
                            url: 'https://test.com'
                        },
                        {
                            name: 'Test search album 5',
                            url: 'https://test.com'
                        }
                    ]
                }
            },
            {
                tag: 'DropSearchAlbum',
                sourceIndex,
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
    afterAll(() => delete (global as any).prompt)

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
                    ...state.charts[0]!,
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
                    ...state.charts[0]!,
                    albums: createTestNamedAlbums(3)
                }
            ]
        })

        expect(promptMock).toHaveBeenCalledTimes(1)
        expect(promptMock.mock.calls[0]).toMatchSnapshot()
        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<[ Action ]>({
            tag: 'RenameAlbum',
            id,
            name
        })
    })
})


describe('RenameAlbum', () => {
    test.each([
        123,
        456,
        1,
        2
    ])('no update when album with id not found or placeholder', id => {
        const result = reducer(state, {
            tag: 'RenameAlbum',
            id,
            name: 'Test new name'
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([
        [ 1, 'Test new name' ],
        [ 2, 'Test other new name' ]
    ])('renames album with id', (id, name) => {
        const result = reducer(
            {
                ...state,
                charts: [
                    {
                        ...state.charts[0]!,
                        albums: createTestNamedAlbums(3)
                    }
                ]
            },
            {
                tag: 'RenameAlbum',
                id,
                name
            }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('DeleteAlbum', () => {
    test.each([ 123, 456 ])('no update when album with id not found', id => {
        const result = reducer(state, { tag: 'DeleteAlbum', id })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 1, 2 ])('replaces album with id with a placeholder', id => {
        const result = reducer(
            {
                ...state,
                charts: [
                    {
                        ...state.charts[0]!,
                        albums: createTestNamedAlbums(3)
                    }
                ]
            },
            {
                tag: 'DeleteAlbum',
                id
            }
        )
        expect(result).toMatchSnapshot()
    })
})


test.each([ true, false ])('UpdateScreenshotLoading', loading => {
    const result = reducer(
        {
            ...state,
            screenshot: {
                ...state.screenshot,
                loading: !loading
            }
        },
        { tag: 'UpdateScreenshotLoading', loading }
    )
    expect(result).toMatchSnapshot()
})


describe('UpdateScreenshotScale', () => {
    test('no update when screenshot in progress', () => {
        const result = reducer(
            {
                ...state,
                screenshot: {
                    ...state.screenshot,
                    loading: true
                }
            },
            {
                tag: 'UpdateScreenshotScale',
                scale: 1
            }
        )
        expect(result).toEqual(noUpdate)
    })

    test.each([ 0, MAX_SCREENSHOT_SCALE + 1 ])('no update when scale out of range', scale => {
        const result = reducer(state, { tag :'UpdateScreenshotScale', scale })
        expect(result).toEqual(noUpdate)
    })

    test.each([ 2, 3 ])('updates screenshot scale', scale => {
        const result = reducer(state, { tag: 'UpdateScreenshotScale', scale })
        expect(result).toMatchSnapshot()
    })
})


describe('TakeScreenshot', () => {
    test('no update when screenshot in progress', () => {
        const result = reducer(
            {
                ...state,
                screenshot: {
                    ...state.screenshot,
                    loading: true
                }
            },
            {
                tag: 'TakeScreenshot',
                element: undefined as any
            }
        )
        expect(result).toEqual(noUpdate)
    })

    // TODO: extract to separate test suite to mock utils module
    test.todo('side effect downloads picture and dispatches action')
})


describe('UpdateChartShape', () => {
    test.each([
        [ 0, 5 ],
        [ MAX_COLLAGE_ROWS_X + 1, 5 ],
        [ 5, 0 ],
        [ 5, MAX_COLLAGE_ROWS_Y + 1 ]
    ])('no update when row counts out of range', (rowsX, rowsY) => {
        const result = reducer(state, {
            tag: 'UpdateChartShape',
            shape: { tag: 'Collage' },
            rowsX,
            rowsY
        })
        expect(result).toEqual(noUpdate)
    })

    test.each<[ ChartShape, number, number ]>([
        [ { tag: 'Collage' }, 3, 7 ],
        [ { tag: 'Top', size: 100 }, 5, 5 ]
    ])('updates chart shape and rows', (shape, rowsX, rowsY) => {
        const result = reducer(
            createTestState({ charts: 3 }),
            {
                tag: 'UpdateChartShape',
                shape,
                rowsX,
                rowsY
            }
        )
        expect(result).toMatchSnapshot()
    })
})


describe('DropExternalFile', () => {
    test.each([ 123, 456 ])('no update if target id nonexistent', id => {
        const result = reducer(state, {
            tag: 'DropExternalFile',
            file: undefined as any,
            targetID: id
        })
        expect(result).toEqual(noUpdate)
    })

    // TODO: extract to separate test suite to mock utils module
    test.todo('side effect dispatches load external file action')
})


describe('LoadExternalFile', () => {
    test.each([ 123, 456 ])('no update if target id nonexistent', id => {
        const result = reducer(state, {
            tag: 'LoadExternalFile',
            name: 'Test name',
            uri: 'Test uri',
            targetID: id
        })
        expect(result).toEqual(noUpdate)
    })

    test.each([
        [ 1, 'Test uri', 'Test name' ],
        [ 2, 'Other test uri', 'Other test name']
    ])('replaces album with id with new album with given uri and name', (id, uri, name) => {
        const result = reducer(state, {
            tag: 'LoadExternalFile',
            name,
            targetID: id,
            uri
        })
        expect(result).toMatchSnapshot()
    })
})


describe('HighlightAlbum', () => {
    test('clears highlightedID if targetID does not exist', () => {
        const result = reducer(
            produce(state, state => {
                state.charts[state.activeChartIndex]!.albums = createTestNamedAlbums(3)
                state.highlightedID = 123
            }),
            {
                tag: 'HighlightAlbum',
                targetID: 456
            }
        )
        expect(result).toMatchSnapshot()
    })

    test('clears highlightedID if targetID is a placeholder', () => {
        const result = reducer(
            { ...state, highlightedID: 123 },
            {
                tag: 'HighlightAlbum',
                targetID: 1
            }
        )
        expect(result).toMatchSnapshot()
    })

    test('sets highlightedID to targetID', () => {
        const result = reducer(
            produce(state, state => {
                state.charts[state.activeChartIndex]!.albums = createTestNamedAlbums(3)
                state.highlightedID = 123
            }),
            {
                tag: 'HighlightAlbum',
                targetID: 1
            }
        )
        expect(result).toMatchSnapshot()
    })
})
