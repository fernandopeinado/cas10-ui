const webpack = require('webpack');
const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
 
const libraryName = 'cas10';
const outputFile = 'cas10.js';

module.exports = {
    entry: {
        'cas10': './src/index.js'
    },
    output: {
        filename: outputFile,
            library: libraryName,
            libraryTarget: 'umd',
        umdNamedDefine: true,
        path: path.join(__dirname, "dist"),
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    devtool: "source-map",
    plugins: [
        new PeerDepsExternalsPlugin(),
    ],
    module: {
        rules: [{
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            }
        ]
    }
};
