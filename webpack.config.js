var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

function getSubDirectories(aSrcPath) {
    return fs.readdirSync(aSrcPath).filter(function(aFile) {
        return fs.statSync(path.resolve(path.join(aSrcPath, aFile))).isDirectory();
    }).map(function (aSubDirectory) {
        return path.resolve(path.join(aSrcPath, aSubDirectory));
    });
}

module.exports = {
    context: path.resolve('./src/app'),
    entry: './app.ts',
    output: {
        path: path.resolve('./www'),
        filename: 'app.js',
    },
    resolve: {
        // alias: {
        //     jquery: 'jquery-es6'
        // },
        root: [path.resolve('./src/app')]
            .concat(getSubDirectories('./src/libs'))
            .concat(getSubDirectories('./src/modules')),
        extensions: ['', '.js', '.ts', '.stache', '.json']
    },
    resolveLoader: {
        root: [
            path.resolve('.'),
            path.resolve('./src')
        ],
        modulesDirectories: [
            'web_loaders',
            'web_modules',
            'node_loaders',
            'node_modules',
            'webpack-loaders'
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.stache$/,
                loaders: [
                    'raw-loader',
                    'trim-template-loader'
                ]
            },
            {
                test: /\.json$/,
                loaders: [
                    'base64-loader',
                    'minify-json-loader'
                ]
            }
        ],
        postLoaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    compact: false
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};
