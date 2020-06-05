import { useEffect, useReducer, Dispatch, Reducer } from 'react'


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


export function useLocalStorageReducer<TState, TAction>(
    key: string,
    fallback: () => TState,
    reducer: Reducer<TState, TAction>
) {
    const [ state, dispatch ] = useLazyReducer(
        reducer,
        () => {
            const value = localStorage.getItem(key)
            return value === null
                ? fallback()
                : JSON.parse(value) as TState
        }
    )

    useEffect(
        () => {
            localStorage.setItem(key, JSON.stringify(state))
        },
        [ state ]
    )

    return [ state, dispatch ] as const
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


export function useSideEffectReducer<TState, TAction>(
    initialState: () => TState,
    reducer: SideEffectReducer<TState, TAction>,
    useReducerHook = useLazyReducer
) {
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

    const [ [ state, sideEffects ], dispatch ] = useReducerHook(
        innerReducer,
        () => [ initialState(), [] ]
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


export function useLocalStorageSideEffectReducer<TState, TAction>(
    key: string,
    initialState: () => TState,
    reducer: SideEffectReducer<TState, TAction>
) {
    return useSideEffectReducer(
        initialState,
        reducer,
        (reducer, initialState) =>
            useLocalStorageReducer(key, initialState, reducer)
    )
}
