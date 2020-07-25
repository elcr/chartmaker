test.todo('UpdateAPIKey')


test.todo('UpdateActiveChart')


describe('PromptForNewChart', () => {
    test.todo('cancelling the prompt dispatches nothing')


    test.todo('entering nothing in the prompt dispatches nothing')


    test.todo('entering name of existing chart dispatches name taken action')


    test.todo('entering unique name dispatches new chart action')
})


test.todo('ShowChartNameTakenMessage')


test.todo('AddNewChart')


describe('PromptToRenameActiveChart', () => {
    test.todo('cancelling the prompt dispatches nothing')


    test.todo('entering nothing in the prompt dispatches nothing')


    test.todo('entering the same name in the prompt dispatches nothing')


    test.todo('entering name of existing chart dispatches name taken action')


    test.todo('entering unique name dispatches rename action')
})


test.todo('RenameActiveChart')


describe('PromptToDeleteActiveChart', () => {
    test.todo('declining the prompt dispatches nothing')


    test.todo('accepting the prompt dispatches delete action')
})


describe('DeleteActiveChart', () => {
    test.todo('replaces active chart if only one chart total')

    test.todo('removes active chart if more than one chart')
})


describe('ImportStateFile', () => {
    test.todo('read error dispatches error action')


    test.todo('json parse error dispatches error action')


    test.todo('validation error dispatches error action')


    test.todo('validation success dispatches load state action')
})


test.todo('ShowInvalidStateImportMessage')


test.todo('LoadState')


test.todo('PromptToExportState')


describe('CancelSearchRequest', () => {
    test.todo('no update wehn search request not in progress')


    test.todo('changes search state to waiting and aborts request controller')
})


describe('SendSearchRequest', () => {
    test.todo('no update when request already in progress')


    test.todo('no update when search query empty')


    test.todo('error when api key empty')


    test.todo('side effect dispatches load state action on request success')


    test.todo('side effect dispatches error action on request status error')


    test.todo('side effect dispatches error action on request response json decode error')


    test.todo('side effect dispatches error action on request response validation error')


    test.todo('side effect dispatches error action on request network error')
})


test.todo('UpdateSearchState')


describe('UpdateSearchQuery', () => {
    test.todo('no update when search state loading')


    test.todo('update for other search states')
})


describe('DragChartAlbum', () => {
    test.todo('no update when source and target ids are same')


    test.todo('no update when album with source id cannot be found')


    test.todo('no update when album with target id cannot be found')


    test.todo('inserts source before target when source index higher')


    test.todo('inserts source after target when target index higher')
})


describe('DropSearchAlbum', () => {
    test.todo('no update when search state not complete')


    test.todo('no update when album with source id cannot be found')


    test.todo('no update when album with target id cannot be found')


    test.todo('replaces album at target index')
})


describe('PromptToRenameAlbum', () => {
    test.todo('dispatches nothing when album with id not found')


    test.todo('dispatches nothing if album with id is a placeholder')


    test.todo('dispatches nothing when prompt cancelled')


    test.todo('dispatches nothing when nothing entered in prompt')


    test.todo('dispatches rename action')
})


describe('RenameAlbum', () => {
    test.todo('no update when album with id not found')


    test.todo('no update when album with id is a placeholder')


    test.todo('renames album with id')
})


describe('DeleteAlbum', () => {
    test.todo('no update when album with id not found')


    test.todo('replaces album with id with a placeholder')
})


test.todo('UpdateScreenshotLoading')


describe('UpdateScreenshotScale', () => {
    test.todo('no update when screenshot in progress')


    test.todo('updates screenshot scale')
})


describe('TakeScreenshot', () => {
    test.todo('no update when screenshot in progress')


    test.todo('side effect downloads picture and dispatches action')
})


test.todo('UpdateChartShape')
