module.exports = {
    testRegex: '\\.test\\.tsx?$',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    snapshotSerializers: [ 'jest-emotion' ]
}
