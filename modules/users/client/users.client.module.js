'use strict';

import Signin from './components/authentication/signin.vue';
import Signup from './components/authentication/signup.vue';
import PasswordForgot from './components/password/forgot.vue';

export default {
    routerConfig: {
        '/signin': {
            component: Signin
        },
        '/signup': {
            component: Signup
        },
        '/password/forgot': {
            component: PasswordForgot
        }
    }
}
