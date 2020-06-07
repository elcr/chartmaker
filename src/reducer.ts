import { Dispatch as _Dispatch } from 'react'

import { SideEffectUpdate } from './hooks'
import { CHART_SIZE } from './constants'


export type Album = {
    title: string
    imageURL: string
}


export type Chart = {
    albums: (Album | null)[]
}


type State = {
    apiKey: string
    charts: Chart[]
    activeChart: Chart
}


type Action =
    | { tag: 'UpdateAPIKey', apiKey: string }


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
    }
}


export function getInitialState(): State {
    const chart: Chart = { albums: Array(CHART_SIZE) }
    return {
        apiKey: '',
        charts: [ chart ],
        activeChart: chart
    }
}
