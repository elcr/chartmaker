module.exports = {
    testRegex: '\\.test\\.tsx?$',
    preset: 'ts-jest',
    testEnvironment: 'node',
    snapshotSerializers: [ 'jest-emotion' ]
}
