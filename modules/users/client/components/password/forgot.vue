<template>
    <h3 class="col-md-12 text-center">Restore your password</h3>
    <p class="small text-center">Enter your account username.</p>
    <div class="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
        <form name="forgotPasswordForm" class="form-horizontal" autocomplete="off" v-on:submit.prevent="askForPasswordReset">
            <fieldset>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" v-model="user.username">
                </div>
                <div class="text-center form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div v-show="error" class="text-center text-danger">
                    <strong v-text="error"></strong>
                </div>
                <div v-show="success" class="text-center text-success">
                    <strong v-text="success"></strong>
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
            askForPasswordReset () {
                this.$resource('/api/auth/forgot').update(this.user).then(function(response) {
                    this.$set('success', response.data.message);
                }, function(response) {
                    this.$set('error', response.data.message);
                });
            }
        }
    }
</script>
