const mock: typeof import('@/components/AlbumRowsContainer') = {
    id: 'rows',

    AlbumRowsContainer: ({ children }) =>
        <div className='mock-album-rows-container'>
            {children}
        </div>
}


export const id = mock.id
export const AlbumRowsContainer = mock.AlbumRowsContainer
