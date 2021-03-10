const mock: typeof import('@/components/AlbumActionButton') = {
    AlbumActionButton: props =>
        <div {...props} className='mock-album-action-button'/>
}


export const AlbumActionButton = mock.AlbumActionButton
