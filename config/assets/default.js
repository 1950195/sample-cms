'use strict';

module.exports = {
    client: {
        lib: {
            js: [
                'public/lib/vue/dist/vue.min.js',
                'public/lib/vue-router/dist/vue-router.min.js',
                'public/lib/vue-resource/dist/vue-resource.min.js'
            ]
        },
        css: [
            'public/css/*.css'
        ],
        js: [
            'public/js/app.js'
        ],
        scss: [
            'modules/*/client/scss/*.*scss'
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
