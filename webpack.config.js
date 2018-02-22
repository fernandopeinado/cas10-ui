var webpack = require('webpack');
var path = require('path');

let libraryName = 'cas10-ui';
let outputFile = libraryName + '.js';


module.exports = {
    entry: {
        'cas10-ui': './src/cas10-ui.js'
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
                        presets: ['env', 'react'],
                        plugins: ["transform-class-properties", "transform-object-rest-spread", "syntax-async-functions", "transform-regenerator"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            }
        ]
    }
};