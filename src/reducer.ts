import { Dispatch as _Dispatch } from 'react'

import { SideEffectUpdate } from './hooks'
import { CHART_ALBUMS_COUNT } from './constants'


export type Album = {
    title: string
    imageURL: string
}


export type Chart = {
    name: string
    albums: (Album | null)[]
}


function createChart(name = 'Untitled chart'): Chart {
    return {
        name,
        albums: Array(CHART_ALBUMS_COUNT).fill(null)
    }
}


type State = {
    apiKey: string
    charts: Chart[]
    activeChart: Chart
}


type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }
    | { tag: 'ChangeActiveChart', chart: Chart }
    | { tag: 'PromptForNewChart' }
    | { tag: 'ShowChartNameTakenMessage' }
    | { tag: 'AddNewChart', name: string }


export type Dispatch<T extends Action['tag'] = Action['tag']> = _Dispatch<Extract<Action, { tag: T }>>
export type DispatchProps<T extends Action['tag'] = Action['tag']> = {
    dispatch: Dispatch<T>
}


export function reducer(state: State, action: Action): SideEffectUpdate<State, Action> {
    switch (action.tag) {
        case 'UpdateAPIKey':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    apiKey: action.apiKey
                }
            }
        case 'ChangeActiveChart':
            return {
                tag: 'Update',
                state: {
                    ...state,
                    activeChart: action.chart
                }
            }
        case 'PromptForNewChart':
            return {
                tag: 'SideEffect',
                sideEffect: (dispatch, state) => {
                    const name = prompt('Enter new chart name:')?.trim()
                    if (name === undefined || name.length === 0) {
                        return
                    }
                    if (state.charts.some(chart => chart.name === name)) {
                        dispatch({ tag: 'ShowChartNameTakenMessage' })
                        return
                    }
                    dispatch({ tag: 'AddNewChart', name })
                }
            }
        case 'ShowChartNameTakenMessage':
            return {
                tag: 'SideEffect',
                sideEffect: () =>
                    alert('A chart with that name already exists')
            }
        case 'AddNewChart': {
            const chart = createChart(action.name)
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [ ...state.charts, chart ],
                    activeChart: chart
                }
            }
        }
    }
}


export function getInitialState(): State {
    const chart = createChart()
    return {
        apiKey: '',
        charts: [ chart ],
        activeChart: chart
    }
}
