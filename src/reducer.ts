import { Dispatch as _Dispatch } from 'react'

import { SideEffectUpdate } from './hooks'
import { Chart, State, createChart } from './state'
import { readInputFileText, splitArrayAtIndex } from './utils'


type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }
    | { tag: 'UpdateActiveChart', chart: Chart }
    | { tag: 'PromptForNewChart' }
    | { tag: 'ShowChartNameTakenMessage' }
    | { tag: 'AddNewChart', name: string }
    | { tag: 'PromptToRenameActiveChart' }
    | { tag: 'RenameActiveChart', name: string }
    | { tag: 'PromptToDeleteActiveChart' }
    | { tag: 'DeleteActiveChart' }
    | { tag: 'PromptToSelectImportJSON' }
    | { tag: 'ShowInvalidImportJSONMessage' }
    | { tag: 'UpdateAllState', state: State }
    | { tag: 'PromptToExportState' }


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
        case 'UpdateActiveChart':
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
            const [ before, after ] = splitArrayAtIndex(state.charts, activeIndex)
            return {
                tag: 'Update',
                state: {
                    ...state,
                    charts: [ ...before, chart, ...after ],
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
                charts = splitArrayAtIndex(state.charts, activeIndex).flat()
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
        case 'PromptToSelectImportJSON':
            return {
                tag: 'SideEffect',
                sideEffect: dispatch => {
                    const input = document.createElement('input')
                    input.style.display = 'none'
                    input.setAttribute('type', 'file')
                    input.accept = 'application/json'

                    input.addEventListener('change', async () => {
                        const file = input.files?.[0]
                        try {
                            if (file === undefined) {
                                return
                            }
                            const json = await readInputFileText(file)
                            const state: State = JSON.parse(json)
                            dispatch({ tag: 'UpdateAllState', state })
                        }
                        catch {
                            dispatch({ tag: 'ShowInvalidImportJSONMessage' })
                        }
                    })

                    // The input change event is never fired if the user closes
                    // the dialog. This has no associated event, so there is no
                    // reliable way to know when it happens.
                    // However, the dialog opening causes the body to lose
                    // focus, and upon closing the body gains focus again.
                    // Listening for the body regaining focus like this is the
                    // only reliable way to clean up the input element.
                    // Also, this doesn't work with addEventListener for some
                    // reason.
                    document.body.onfocus = () => {
                        input.remove()
                        document.body.onfocus = null
                    }

                    // Doesn't seem to work on Firefox (???)
                    input.click()
                }
            }
        case 'ShowInvalidImportJSONMessage':
            return {
                tag: 'SideEffect',
                sideEffect: () =>
                    alert('Selected file is invalid')
            }
        case 'UpdateAllState':
            return {
                tag: 'Update',
                state: action.state
            }
        case 'PromptToExportState':
            return {
                tag: 'SideEffect',
                sideEffect: (_dispatch, state) => {
                    const link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = 'data:application/json;charset=utf-8,'
                        + encodeURIComponent(JSON.stringify(state))
                    link.download = 'state.json'
                    link.click()
                    // Can safely just remove straight away this time
                    link.remove()
                }
            }
    }
}
