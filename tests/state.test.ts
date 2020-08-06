import {
    createChart,
    createInitialState,
    loadStateFromLocalStorage,
    escapeStateForExport,
    saveStateToLocalStorage
} from '@/state'
import { LOCAL_STORAGE_KEY } from '@/constants'

import {
    createTestState,
    createTestStateForEscaping,
    ignore
} from './utils'


describe('createChart', () => {
    test('no arguments creates default chart', () => {
        const result = createChart()
        expect(result).toMatchSnapshot()
    })

    test('albumIDCounter argument affects new album IDs', () => {
        const result = createChart({ albumIDCounter: 100 })
        expect(result).toMatchSnapshot()
    })

    test('name argument changes chart name', () => {
        const result = createChart({ name: 'Test chart' })
        expect(result).toMatchSnapshot()
    })
})


test('createInitialState', () => {
    const state = createInitialState()
    expect(state).toMatchSnapshot()
})


describe('loadStateFromLocalStorage', () => {
    const localStorageMock = jest.spyOn(Storage.prototype, 'getItem')

    afterEach(() => localStorageMock.mockRestore())

    test('returns valid state in local storage', () => {
        const state = createTestState({ albums: 100 })
        localStorageMock.mockImplementation(() => JSON.stringify(state))
        const returnedState = loadStateFromLocalStorage()
        expect(returnedState).toEqual(state)
    })

    test.each([
        '{',
        '{}',
        '0',
        JSON.stringify({
            ...createTestState(),
            charts: undefined
        })
    ])('returns null when invalid state json in local storage', json => {
        localStorageMock.mockImplementation(() => json)
        const state = loadStateFromLocalStorage()
        expect(state).toBeNull()
    })

    test('returns null when nothing in local storage', () => {
        localStorageMock.mockImplementation(() => null)
        const state = loadStateFromLocalStorage()
        expect(state).toBeNull()
    })
})


test('escapeStateForExport', () => {
    const escaped = escapeStateForExport(createTestStateForEscaping())
    expect(escaped).toEqual(createTestState())
})


describe('saveStateToLocalStorage', () => {
    const localStorageMock = jest.spyOn(Storage.prototype, 'setItem')

    afterEach(() => localStorageMock.mockRestore())

    test('escapes and json encodes state', () => {
        localStorageMock.mockImplementation(ignore)

        saveStateToLocalStorage(createTestStateForEscaping())

        expect(localStorageMock).toHaveBeenCalledTimes(1)
        expect(localStorageMock).toHaveBeenCalledWith(
            LOCAL_STORAGE_KEY,
            JSON.stringify(createTestState())
        )
    })
})
