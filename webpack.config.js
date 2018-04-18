var webpack = require('webpack');
var path = require('path');

let libraryName = 'cas10';
let outputFile = 'cas10.js';

module.exports = {
    entry: {
        'cas10': './src/cas10.js'
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
    externals: {
        // Use external version of React
        "react": "React",
        "react-dom": "ReactDOM"
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-2']
                    }
                }
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
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            }
        ]
    }
};
