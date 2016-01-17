import App from './components/app.vue';
import Homepage from "./components/homepage.vue";
import Signin from '../../users/client/components/authentication/signin.vue';
import Signup from '../../users/client/components/authentication/signup.vue';
import PasswordForgot from '../../users/client/components/password/forgot.vue';


const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.map({
    '/': {
        component: Homepage
    },
    '/signin': {
        component: Signin
    },
    '/signup': {
        component: Signup
    },
    '/password/forgot': {
        component: PasswordForgot
    }
}).redirect({
    '*': '/'
});

router.start(Vue.extend(App), '#app');

