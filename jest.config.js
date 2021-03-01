export default {
    testRegex: '\\.test\\.tsx?$',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^(.*)\\.js$': '$1'
    },
    snapshotSerializers: [ 'jest-emotion' ],
    snapshotResolver: './jest.snapshotResolver.cjs',
    resolver: 'jest-webpack-resolver'
}
