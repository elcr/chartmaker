module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) =>
        testPath + snapshotExtension,
    resolveTestPath: (snapshotFilePath, snapshotExtension) =>
        snapshotFilePath.slice(0, -snapshotExtension.length),
    testPathForConsistencyCheck: 'tests/example.test.ts'
}
