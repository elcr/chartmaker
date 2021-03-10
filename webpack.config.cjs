const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PreCSS = require('precss')
const Autoprefixer = require('autoprefixer')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')


const sourceDirectory = path.join(__dirname, 'src')


module.exports = {
    entry: path.join(sourceDirectory, 'index.tsx'),
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    resolve: {
        plugins: [ new TSConfigPathsPlugin() ],
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                PreCSS,
                                Autoprefixer
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'string-replace-loader',
                        options: {
                            // remove license comments
                            search: /^\/\*!.+?\*\//s,
                            replace: ''
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.join(sourceDirectory, 'template.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true
            },
            cache: false
        }),
        new InlineSourceWebpackPlugin({
            compress: true,
            noAssetMatch: 'warn'
        })
    ],
    mode: 'development'
}
