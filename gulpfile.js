'use strict';

const assets = require('./config/assets/default');
const gulp = require('gulp');
const _ = require('lodash');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const webpackConfig = {
    output: {
        path: "/public/js",
        publicPath: "/public/",
        filename: "app.js"
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
    devtool: 'source-map',
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        modulesDirectories: ['node_modules']
    }
};

gulp.task('env:dev', function() {
    _.merge(assets, require('./config/assets/development'));
    process.env.NODE_ENV = 'development';
});

gulp.task('nodemon', function() {
    return $.nodemon({
        script: 'server.js',
        ext: 'js,html,swig',
        watch: _.union(
            assets.server.views,
            assets.server.allJS,
            assets.server.config
        ),
        ignore: ['./node_modules/**']
    });
});

gulp.task('vue', function() {
    return gulp.src(assets.client.apps)
        .pipe($.webpack(webpackConfig))
        .pipe(gulp.dest('public/js/'))
        .pipe($.connect.reload());
});

gulp.task('watch', function() {
    $.livereload.listen();
    gulp.watch(assets.server.views).on('change', $.livereload.changed);
    gulp.watch(assets.server.allJS).on('change', $.livereload.changed);
    gulp.watch(assets.client.js).on('change', $.livereload.changed);
    gulp.watch(assets.client.css).on('change', $.livereload.changed);
    gulp.watch(assets.client.sass, ['sass']).on('change', $.livereload.changed);
    gulp.watch(assets.client.views).on('change', $.livereload.changed);
});

gulp.task('default', function(done) {
    runSequence('env:dev', ['nodemon', 'vue', 'watch'], done);
});
