const mock: typeof import('@/components/AlbumTitle') = {
    AlbumTitle: ({ id, highlighted, name, children }) =>
        <div className='mock-album-title'>
            {`ID: ${id}`}
            {`Name: ${name}`}
            {`Highlighted: ${highlighted}`}
            {children}
        </div>
}


export const AlbumTitle = mock.AlbumTitle
