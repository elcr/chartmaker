import { h, FunctionComponent } from 'preact'
import { css } from 'emotion'

import { Label } from './Label'
import { DispatchProps } from '../reducer'
import { ControlledForm } from './ControlledForm'
import { SidebarGroup } from './SidebarGroup'
import { ControlledInput } from './ControlledInput'
import { SearchState } from '../state'


const id = 'search'


type Props = DispatchProps<'UpdateSearchQuery' | 'SendSearchRequest' | 'CancelSearchRequest'> & {
    searchState: SearchState
}


const errorStyle = css({
    color: 'red',
    marginBottom: '0.25rem',
    userSelect: 'none'
})


export const SearchBox: FunctionComponent<Props> = ({ dispatch, searchState }) => {
    function sendSearchRequest() {
        dispatch({ tag: 'CancelSearchRequest' })
        dispatch({ tag: 'SendSearchRequest' })
    }

    function updateQuery(query: string) {
        dispatch({ tag: 'UpdateSearchQuery', query })
    }

    const errorMessage = searchState.tag === 'Error'
        ? (
            <div class={errorStyle}>
                {searchState.message}
            </div>
        )
        : null

    return (
        <SidebarGroup>
            <ControlledForm onSubmit={sendSearchRequest}>
                <Label target={id}>
                    Search for albums
                </Label>
                {errorMessage}
                <ControlledInput id={id}
                    value={searchState.query}
                    onChange={updateQuery}
                    placeholder='Artist or album name'
                    disabled={searchState.tag === 'Loading'}/>
            </ControlledForm>
        </SidebarGroup>
    )
}
