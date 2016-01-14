'use strict';

const env = require('./config/env/default');
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

gulp.task('env:dev', function() {
    process.env.NODE_ENV = 'development';
    _.merge(env, require('./config/env/development'));
    _.merge(assets, require('./config/assets/development'));
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
        .pipe(gulp.dest('./public/js/'))
        .pipe($.connect.reload());
});

gulp.task('sass', function () {
    gulp.src(assets.client.scss)
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({outputStyle: 'compact'}).on('error', $.sass.logError))
        .pipe($.autoprefixer('last 2 version'))
        .pipe($.concat('app.css'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    $.livereload.listen({port: env.livereloadPort});
    gulp.watch(assets.server.views).on('change', $.livereload.changed);
    gulp.watch(assets.server.allJS).on('change', $.livereload.changed);
    gulp.watch(assets.client.js).on('change', $.livereload.changed);
    gulp.watch(assets.client.css).on('change', $.livereload.changed);
    gulp.watch(assets.client.apps).on('change', $.livereload.changed);
    gulp.watch(assets.client.components).on('change', $.livereload.changed);
    gulp.watch(assets.client.scss, ['sass']);
});

gulp.task('default', function(done) {
    runSequence('env:dev', ['sass', 'vue', 'nodemon', 'watch'], done);
});
