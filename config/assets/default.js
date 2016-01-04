'use strict';

module.exports = {
    client: {
        lib: {
            css: [],
            js: [
                'public/js/app.js'
            ]
        },
        css: [
            'modules/*/client/css/*.css'
        ],
        sass: [
            'modules/*/client/scss/*.scss'
        ],
        js: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js'
        ],
        apps: [
            'modules/*/client/*.client.module.js'
        ],
        components: [
            'modules/*/client/components/**/*.vue'
        ]
    },
    server: {
        gulpConfig: 'gulpfile.js',
        allJS: [
            'server.js',
            'config/**/*.js',
            'modules/*/server/**/*.js'
        ],
        models: [
            'modules/*/server/models/**/*.js'
        ],
        routes: [
            'modules/!(core)/server/routes/**/*.js',
            'modules/core/server/routes/**/*.js'
        ],
        config: [
            'modules/*/server/config/*.js'
        ],
        views: [
            'modules/*/server/views/*.html'
        ]
    }
};
