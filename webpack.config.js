'use strict';

module.exports = {
    entry: {
        core: './modules/core/client/core.client.module.js'
    },
    output: {
        path: __dirname + '/public/js',
        publicPath: '/public/',
        filename: '[name].js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\//,
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    vue: {
        autoprefixer: {
            browsers: ['last 2 versions']
        },
        loaders: {
            sass: 'style!css!sass?indentedSyntax',
            scss: 'style!css!sass'
        }
    },
    devtool: 'source-map',
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        modulesDirectories: ['node_modules']
    }
};
