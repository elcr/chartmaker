module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: [
                    'node 13',
                    'last 1 firefox version',
                    'last 1 chrome version'
                ]
            }
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic'
            }
        ],
        '@babel/preset-typescript'
    ]
}
