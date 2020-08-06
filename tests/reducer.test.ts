import { reducer, Action } from '@/reducer'

import { createTestState } from './utils'
import { State } from '@/types'


type ActionParams = [ Action ]


const dispatchMock = jest.fn<void, ActionParams>()
afterEach(() => dispatchMock.mockReset())


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
    const promptMock = jest.fn<ReturnType<typeof prompt>, Parameters<typeof prompt>>()
    beforeAll(() => global.prompt = promptMock)
    afterEach(() => promptMock.mockRestore())
    afterAll(() => delete global.prompt)

    test('cancelling the prompt dispatches nothing', () => {
        promptMock.mockImplementation(() => null)

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(0)
    })

    test('entering nothing in the prompt dispatches nothing', () => {
        promptMock.mockImplementation(() => '')

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(0)
    })

    test('entering name of existing chart dispatches name taken action', () => {
        promptMock.mockImplementation(() => 'Test chart 1')

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowChartNameTakenMessage'
        })
    })

    test('entering unique name dispatches new chart action', () => {
        const name = 'Test new chart'
        promptMock.mockImplementation(() => name)

        const result = reducer(state, { tag: 'PromptForNewChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

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

    test('calls alert', () => {
        const result = reducer(state, { tag: 'ShowChartNameTakenMessage' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(0)
        expect(alertMock).toHaveBeenCalledTimes(1)
        expect(alertMock).toHaveBeenCalledWith('A chart with that name already exists')
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
    const promptMock = jest.fn<ReturnType<typeof prompt>, Parameters<typeof prompt>>()
    beforeAll(() => global.prompt = promptMock)
    afterEach(() => promptMock.mockRestore())
    afterAll(() => delete global.prompt)

    test('cancelling the prompt dispatches nothing', () => {
        promptMock.mockImplementation(() => null)

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(0)
    })

    test('entering nothing in the prompt dispatches nothing', () => {
        promptMock.mockImplementation(() => '')

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(0)
    })

    test('entering the same name as active chart in the prompt dispatches nothing', () => {
        promptMock.mockImplementation(() => state.charts[state.activeChartIndex].name)

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(dispatchMock).toHaveBeenCalledTimes(0)
    })

    test('entering name of other existing chart dispatches name taken action', () => {
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

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, stateWithExtraChart)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith<ActionParams>({
            tag: 'ShowChartNameTakenMessage'
        })
    })

    test('entering unique name dispatches rename action', () => {
        const name = 'Renamed test chart'
        promptMock.mockImplementation(() => name)

        const result = reducer(state, { tag: 'PromptToRenameActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

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

    test('declining the prompt dispatches nothing', () => {
        confirmMock.mockImplementation(() => false)

        const result = reducer(state, { tag: 'PromptToDeleteActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

        expect(confirmMock).toHaveBeenCalledTimes(1)
        expect(confirmMock).toHaveBeenCalledWith('Really delete active chart? This cannot be undone')
        expect(dispatchMock).toHaveBeenCalledTimes(0)
    })

    test('accepting the prompt dispatches delete action', () => {
        confirmMock.mockImplementation(() => true)

        const result = reducer(state, { tag: 'PromptToDeleteActiveChart' })
        expect(result).toMatchSnapshot()

        const { sideEffect } = result as Extract<typeof result, { tag: 'SideEffect' }>
        sideEffect(dispatchMock, state)

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
    test.todo('read error dispatches error action')


    test.todo('json parse error dispatches error action')


    test.todo('validation error dispatches error action')


    test.todo('validation success dispatches load state action')
})


test.todo('ShowInvalidStateImportMessage')


test.todo('LoadState')


test.todo('PromptToExportState')


describe('CancelSearchRequest', () => {
    test.todo('no update wehn search request not in progress')


    test.todo('changes search state to waiting and aborts request controller')
})


describe('SendSearchRequest', () => {
    test.todo('no update when request already in progress')


    test.todo('no update when search query empty')


    test.todo('error when api key empty')


    test.todo('side effect dispatches load state action on request success')


    test.todo('side effect dispatches error action on request status error')


    test.todo('side effect dispatches error action on request response json decode error')


    test.todo('side effect dispatches error action on request response validation error')


    test.todo('side effect dispatches error action on request network error')
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
