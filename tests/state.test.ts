import {
    createChart,
    createInitialState,
    loadStateFromLocalStorage,
    escapeStateForExport,
    saveStateToLocalStorage,
    isPlaceholderAlbum,
    getAlbumID,
    findAlbumIndexWithID
} from '@/state'
import { LOCAL_STORAGE_KEY } from '@/constants'
import type { Album } from '@/types'

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

    test('name argument changes chart name', () => {
        const name = 'Test chart'
        const result = createChart(name)
        expect(result).toMatchSnapshot()
    })
})


test('createInitialState', () => {
    const state = createInitialState()
    expect(state).toMatchSnapshot()
})


describe('validateState', () => {
    test.todo('returns state when valid state passed')

    test.todo('returns updated state when outdated but valid state passed')

    test.todo('returns null when invalid state passed')
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

    test.todo('returns updated state when outdated state in local storage')

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
        const [ key, json ] = localStorageMock.mock.calls[0]!
        expect(key).toBe(LOCAL_STORAGE_KEY)
        const state = JSON.parse(json)
        expect(state).toEqual(createTestState())
    })
})


describe('isPlaceholderAlbum', () => {
    test('returns false for album objects', () => {
        const result = isPlaceholderAlbum({ id: 1, name: '', url: '' })
        expect(result).toBe(false)
    })

    test('returns true for numbers', () => {
        const result = isPlaceholderAlbum(1)
        expect(result).toBe(true)
    })
})


describe('getAlbumID', () => {
    test.each([ 123, 456 ])('returns placeholder id', id => {
        const result = getAlbumID(id)
        expect(result).toBe(id)
    })

    test.each([ 123, 456 ])('returns named id', id => {
        const result = getAlbumID({ id, name: '', url: '' })
        expect(result).toBe(id)
    })
})


describe('findAlbumIndexWithID', () => {
    const albums: ReadonlyArray<Album> = [
        123,
        456,
        { id: 789, name: '', url: '' }
    ]

    test.each<[ number, number ]>([
        [ 123, 0 ],
        [ 456, 1 ],
        [ 789, 2 ]
    ])('returns index when album with id in array', (id, index) => {
        const result = findAlbumIndexWithID(albums, id)
        expect(result).toBe(index)
    })

    test('returns null when no album with id in array', () => {
        const result = findAlbumIndexWithID(albums, 1234)
        expect(result).toBeNull()
    })
})
