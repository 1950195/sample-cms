'use strict';

const assets = require('./config/assets/default');
const gulp = require('gulp');
const _ = require('lodash');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

gulp.task('env:dev', function() {
    _.merge(assets, require('./config/assets/development'));
    process.env.NODE_ENV = 'development';
});

gulp.task('nodemon', function() {
    return $.nodemon({
        script: 'server.js',
        ext: 'js,html',
        watch: _.union(
            assets.server.views,
            assets.server.allJS,
            assets.server.config
        ),
        ignore: ['./node_modules/**']
    });
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

gulp.task('default', function (done) {
    runSequence('env:dev', ['nodemon', 'watch'], done);
});
