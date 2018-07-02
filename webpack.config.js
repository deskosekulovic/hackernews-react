/*eslint no-undef: "error"*/
/*eslint-env node*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
        // new workboxPlugin.GenerateSW({
        //     swDest: 'sw.js',
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ]
};
