'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.min.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.min.css'
            ],
            js: [
                'public/lib/vue/dist/vue.min.js',
                'public/lib/vue-router/dist/vue-router.min.js',
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/bootstrap/dist/js/bootstrap.min.js',
                'public/js/app.js'
            ]
        },
        css: [
            'modules/*/client/css/*.css'
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
