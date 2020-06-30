import { useEffect, useReducer, Reducer } from 'preact/hooks'
import { Runtype } from 'runtypes'


export type Dispatch<TAction> = (action: TAction) => void


function useLazyReducer<TState, TAction>(
    reducer: Reducer<TState, TAction>,
    initialState: () => TState
): readonly [ TState, Dispatch<TAction> ] {
    return useReducer(
        reducer,
        undefined,
        initialState
    )
}


export type SideEffect<TState, TAction> = (
    dispatch: Dispatch<TAction>,
    state: TState
) => void


export type SideEffectUpdate<TState, TAction> =
    | { tag: 'NoUpdate' }
    | { tag: 'Update', state: TState }
    | {
        tag: 'UpdateWithSideEffect'
        state: TState
        sideEffect: SideEffect<TState, TAction>
    }
    | {
        tag: 'SideEffect',
        sideEffect: SideEffect<TState, TAction>
    }


export type SideEffectReducer<TState, TAction> = (
    state: TState,
    action: TAction
) => SideEffectUpdate<TState, TAction>


type SideEffectArray<TState, TAction> = SideEffect<TState, TAction>[]
type StateTuple<TState, TAction> = [ TState, SideEffectArray<TState, TAction> ]


type HookArguments<TState, TRunType extends Runtype<TState>, TAction> = {
    key: string
    type: TRunType,
    createInitialState: () => TState,
    escapeState: (state: TState) => TState,
    reducer: SideEffectReducer<TState, TAction>
}


export function useLocalStorageSideEffectReducer<
    TState,
    TRunType extends Runtype<TState>,
    TAction
>({
    key,
    type,
    createInitialState,
    escapeState,
    reducer
}: HookArguments<TState, TRunType, TAction>) {
    function innerReducer(
        [ state, sideEffects ]: StateTuple<TState, TAction>,
        action: TAction
    ): StateTuple<TState, TAction> {
        const result = reducer(state, action)
        switch (result.tag) {
            case 'NoUpdate':
                return [ state, sideEffects ]
            case 'Update':
                return [ result.state, sideEffects ]
            case 'UpdateWithSideEffect':
                return [ result.state, [ ...sideEffects, result.sideEffect ] ]
            case 'SideEffect':
                return [ state, [ ...sideEffects, result.sideEffect ] ]
        }
    }

    const [ [ state, sideEffects ], dispatch ] = useLazyReducer(
        innerReducer,
        () => {
            const json = localStorage.getItem(key)
            if (json === null) {
                return [ createInitialState(), [] ]
            }
            const state: unknown = JSON.parse(json)
            if (type.guard(state)) {
                return [ state, [] ]
            }
            return [ createInitialState(), [] ]
        }
    )

    useEffect(
        () => {
            const escaped = escapeState(state)
            localStorage.setItem(key, JSON.stringify(escaped))
        },
        [ state ]
    )

    useEffect(
        () => {
            while (sideEffects.length > 0) {
                sideEffects.shift()!(dispatch, state)
            }
        },
        [ sideEffects ]
    )

    return [ state, dispatch ] as const
}
