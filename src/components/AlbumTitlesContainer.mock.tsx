const mock: typeof import('@/components/AlbumTitlesContainer') = {
    id: 'titles',

    AlbumTitlesContainer: ({ children }) =>
        <div className='mock-album-titles-container'>
            {children}
        </div>
}


export const AlbumTitlesContainer = mock.AlbumTitlesContainer
