const mock: typeof import('@/components/AlbumTitleGroup') = {
    AlbumTitleGroup: ({ children }) =>
        <div className='mock-album-title-group'>
            {children}
        </div>
}


export const AlbumTitleGroup = mock.AlbumTitleGroup
