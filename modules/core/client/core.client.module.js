'use strict';

import App from './components/app.vue';
import Homepage from "./components/homepage.vue";
import userConfig from "../../users/client/users.client.module";

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

let routerConfig = {
    '/': {
        name: 'home',
        component: Homepage
    }
};

Object.assign(routerConfig, userConfig.routerConfig);

router.map(routerConfig).redirect({
    '*': '/'
});

router.start(Vue.extend(App), '#app');
