'use strict';

export function configRouter(router) {
    router.map({
        '/signup': {
            component: require('../components/authentication/signup.vue');
        },
        '/signin?err': {
            component: require('../components/authentication/signin.vue');
        }
    });
]);
