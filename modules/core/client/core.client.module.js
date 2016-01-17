import App from './components/app.vue';
import Signin from '../../users/client/components/authentication/signin.vue';

const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.map({
    '/signin': {
        component: Signin
    }
});

router.start(Vue.extend(App), '#app');

