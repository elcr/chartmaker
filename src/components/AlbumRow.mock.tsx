const mock: typeof import('@/components/AlbumRow') = {
    AlbumRow: ({ children }) =>
        <div className='mock-album-row'>
            {children}
        </div>
}


export const AlbumRow = mock.AlbumRow
