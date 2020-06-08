import { Dispatch as _Dispatch } from 'react'

import { SideEffectUpdate } from './hooks'
import { Chart, State, createChart } from './state'


type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }
    | { tag: 'ChangeActiveChart', chart: Chart }
    | { tag: 'PromptForNewChart' }
    | { tag: 'ShowChartNameTakenMessage' }
    | { tag: 'AddNewChart', name: string }
    | { tag: 'PromptToRenameActiveChart' }
    | { tag: 'RenameActiveChart', name: string }
    | { tag: 'PromptToDeleteActiveChart' }
    | { tag: 'DeleteActiveChart' }

export type ActionTag = Action['tag']

export type Dispatch<T extends ActionTag = ActionTag> = _Dispatch<Extract<Action, { tag: T }>>
export type DispatchProps<T extends ActionTag = ActionTag> = {
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
        case 'PromptToRenameActiveChart':
            return {
                tag: 'SideEffect',
                sideEffect: (dispatch, state) => {
                    const name = prompt('Enter new chart name:')?.trim()
                    if (name === undefined || name.length === 0) {
                        return
                    }
                    if (state.charts.some(chart => chart !== state.activeChart && chart.name === name)) {
                        dispatch({ tag: 'ShowChartNameTakenMessage' })
                        return
                    }
                    dispatch({ tag: 'RenameActiveChart', name })
                }
            }
        case 'RenameActiveChart': {
            const activeIndex = state.charts.indexOf(state.activeChart)
            const chart = {
                ...state.activeChart,
                name: action.name
            }
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [
                        ...state.charts.slice(0, activeIndex),
                        chart,
                        ...state.charts.slice(activeIndex + 1)
                    ],
                    activeChart: chart
                }
            }
        }
        case 'PromptToDeleteActiveChart':
            return {
                tag: 'SideEffect',
                sideEffect: dispatch => {
                    if (confirm('Really delete active chart? This cannot be undone')) {
                        dispatch({ tag: 'DeleteActiveChart' })
                    }
                }
            }
        case 'DeleteActiveChart': {
            let activeChart: Chart
            let charts: Chart[]
            if (state.charts.length === 1) {
                activeChart = createChart()
                charts = [ activeChart ]
            }
            else {
                const activeIndex = state.charts.indexOf(state.activeChart)
                activeChart = activeIndex === 0
                    ? state.charts[1]
                    : state.charts[activeIndex - 1]
                charts = [
                    ...state.charts.slice(0, activeIndex),
                    ...state.charts.slice(activeIndex + 1)
                ]
            }
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts,
                    activeChart
                }
            }
        }
    }
}
