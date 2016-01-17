<template>
    <h3 class="col-md-12 text-center">Or sign up using your email</h3>
    <div class="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
        <form name="userForm" class="signup" autocomplete="off" v-on:submit.prevent="signup">
            <fieldset>
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" v-model="user.firstName" class="form-control" placeholder="First Name">
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" v-model="user.lastName" class="form-control" placeholder="Last Name">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="user.email" class="form-control" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="user.username" class="form-control" placeholder="Username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                </div>
                <div class="text-center form-group">
                    <button type="submit" class="btn btn-primary">Sign up</button>
                    &nbsp; or&nbsp;
                    <a v-link="{ path: '/signin' }" class="show-signup">Sign in</a>
                </div>
                <div v-show="error" class="text-center text-danger">
                    <strong v-text="error"></strong>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            user: {}
        },
        methods: {
            signup () {
                this.$resource('/api/auth/signup').save(this.user).then(function(response) {
                    router.go('home');
                }, function(response) {
                    this.$set('error', response.data.message);
                });
            }
        }
    }
</script>
