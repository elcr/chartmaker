import { Dispatch as _Dispatch } from 'react'

import { APIKeyInputPageState } from './APIKeyInputPage'
import { ChartEditorPageState } from './ChartEditorPage'
import { SideEffectUpdate } from './hooks'


type State =
    | { page: 'APIKeyInput' } & APIKeyInputPageState
    | { page: 'ChartEditor' } & ChartEditorPageState


type Action =
    | { tag: 'UpdateAPIKeyInputText', key: string }
    | { tag: 'ChangeAPIKey', key: string }


export type Dispatch<T extends Action['tag'] = Action['tag']> = _Dispatch<Extract<Action, { tag: T }>>
export type DispatchProps<T extends Action['tag'] = Action['tag']> = {
    dispatch: Dispatch<T>
}


export function reducer(state: State, action: Action): SideEffectUpdate<State, Action> {
    switch (action.tag) {
        case 'UpdateAPIKeyInputText': {
            if (state.page !== 'APIKeyInput') {
                return { tag: 'NoUpdate' }
            }
            return {
                tag: 'Update',
                state: {
                    page: 'APIKeyInput',
                    key: action.key
                }
            }
        }
        case 'ChangeAPIKey': {
            return {
                tag: 'Update',
                state: {
                    page: 'ChartEditor',
                    key: action.key
                }
            }
        }
    }
}


export function getInitialState(): State {
    return {
        page: 'APIKeyInput',
        key: ''
    }
}
