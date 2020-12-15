const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const serverConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/server/index.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.server.json'
                }
            }]
        }]
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()]
};

const clientConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/client/index.tsx',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss']
    },
    module: {
        rules: [{
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/index.html',
            filename: 'index.html'
        })
    ]
};

module.exports = [serverConfig, clientConfig];