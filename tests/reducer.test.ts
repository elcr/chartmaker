import { SideEffectUpdate, update, noUpdate } from 'react-use-side-effect-reducer'

import { reducer, Action } from '@/reducer'
import { search, SearchResultAlbum } from '@/api'
import { State, SearchState } from '@/types'

import { createTestState } from './utils'


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


test.todo('UpdateSearchState')


describe('UpdateSearchQuery', () => {
    test.todo('no update when search state loading')


    test.todo('update for other search states')
})


describe('DragChartAlbum', () => {
    test.todo('no update when source and target ids are same')


    test.todo('no update when album with source id cannot be found')


    test.todo('no update when album with target id cannot be found')


    test.todo('inserts source before target when source index higher')


    test.todo('inserts source after target when target index higher')
})


describe('DropSearchAlbum', () => {
    test.todo('no update when search state not complete')


    test.todo('no update when album with source id cannot be found')


    test.todo('no update when album with target id cannot be found')


    test.todo('replaces album at target index')
})


describe('PromptToRenameAlbum', () => {
    test.todo('dispatches nothing when album with id not found')


    test.todo('dispatches nothing if album with id is a placeholder')


    test.todo('dispatches nothing when prompt cancelled')


    test.todo('dispatches nothing when nothing entered in prompt')


    test.todo('dispatches rename action')
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
