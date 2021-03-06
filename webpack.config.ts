const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

    // webpack will take the files from ./src/index
    entry: path.join(__dirname, '/src/index.tsx'),

    // and output it into /dist as bundle.js
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: "source-map",
    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // mainFields: ['main', 'module']
    },

    module: {
        rules: [

            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(png|svg|jpg|gif|mp4)$/,
                use: [
                    'file-loader',
                ],
            },

            // // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html')
        })
    ]
};
